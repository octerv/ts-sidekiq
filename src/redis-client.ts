import { createClient } from "redis";
import { SidekiqJob, SidekiqRetryJob } from "./types";

const redisClient = async (url?: string) => {
  return await createClient({ url: url || "redis://localhost:6379/5" })
    .on("error", (err) => console.error("Redis Clinet Error", err))
    .connect();
};

export const getSidekiqData = async (redisUrl?: string) => {
  try {
    const client = await redisClient(redisUrl);

    // すべてのキーを取得
    const allKeys = await client.keys("*");

    const queueKeys = await client.keys("queue:*");
    const queueData = await Promise.all(
      queueKeys.map(async (key) => {
        const size = await client.lLen(key);
        return { queue: key.replace("queue:", ""), size };
      })
    );

    // "stat:*" にマッチするすべての統計キーを取得
    const statKeys = await client.keys("stat:*");
    const statsData = await Promise.all(
      statKeys.map(async (key) => {
        const value = await client.get(key);
        return { stat: key.replace("stat:", ""), value };
      })
    );

    // "retry" キーのデータの件数を取得
    const retryCount = await client.zCard("retry");
    statsData.push({ stat: "retry", value: retryCount.toString() });

    const processSet = await client.sMembers("processes");
    const processData = await Promise.all(
      processSet.map(async (processKey) => {
        const processInfo = await client.hGetAll(processKey);
        return { processKey, processInfo };
      })
    );

    // cron_job:* にマッチするすべてのクロンジョブキーを取得
    const cronJobKeys = await client.keys("cron_job:*");
    const cronJobsData = await Promise.all(
      cronJobKeys.map(async (key) => {
        const type = await client.type(key); // キーのタイプを取得
        switch (type) {
          case "string":
            const stringValue = await client.get(key);
            return { key, type, value: stringValue };
          case "list":
            const listValues = await client.lRange(key, 0, -1);
            return { key, type, value: listValues };
          case "set":
            const setValues = await client.sMembers(key);
            return { key, type, value: setValues };
          case "zset":
            const zsetValues = await client.zRange(key, 0, -1);
            return { key, type, value: zsetValues };
          case "hash":
            const hashValues = await client.hGetAll(key);
            return { key, type, details: hashValues };
          default:
            return { key, type, message: "Unsupported type" };
        }
      })
    );

    return {
      keys: allKeys,
      queues: queueData,
      stats: statsData,
      processes: processData,
      cronJobs: cronJobsData,
    };
  } catch (err) {
    console.error(err);
  }
};

export const getQueueJobs = async (
  queueName: string,
  redisUrl?: string
): Promise<SidekiqJob[]> => {
  try {
    const client = await redisClient(redisUrl);
    const jobs = await client.lRange(`queue:${queueName}`, 0, -1);

    const queueJobsData: SidekiqJob[] = jobs.map((jobString) => {
      try {
        const jobDetails: SidekiqJob = JSON.parse(jobString);
        return jobDetails;
      } catch (err) {
        console.error(`JSON parsing error for job: ${jobString}`, err);
        return {} as SidekiqJob;
      }
    });

    return queueJobsData;
  } catch (err) {
    console.error(`Failed to get jobs from queue: ${queueName}`, err);
    return [];
  }
};

export const getRetryJobsDetails = async (
  redisUrl?: string
): Promise<SidekiqRetryJob[]> => {
  try {
    const client = await redisClient(redisUrl);
    const retryJobs = await client.zRange("retry", 0, -1);

    const retryJobsData: SidekiqRetryJob[] = retryJobs.map((jobString) => {
      try {
        const jobDetails: SidekiqRetryJob = JSON.parse(jobString);
        return jobDetails;
      } catch (err) {
        console.error(`JSON parsing error for job: ${jobString}`, err);
        // 失敗した場合は空のオブジェクトを返します（または適切なエラー処理を実施する）
        return {} as SidekiqRetryJob;
      }
    });

    return retryJobsData;
  } catch (err) {
    console.error("失敗したジョブの取得中にエラーが発生しました:", err);
    // エラーが発生した場合は空の配列を返します（または適切なエラー処理を実施する）
    return [];
  }
};

export const removeJobFromRetry = async (jids: string[], redisUrl?: string) => {
  try {
    const client = await redisClient(redisUrl);
    const jobs = await client.zRange("retry", 0, -1);

    for (const jobString of jobs) {
      const job = JSON.parse(jobString);
      if (jids.includes(job.jid)) {
        // 指定されたjidを持つジョブを削除
        await client.zRem("retry", jobString);
        console.log(
          `Job with jid: ${job.jid} has been removed from retry queue.`
        );
      }
    }
  } catch (err) {
    console.error("Error removing job from retry:", err);
    throw err;
  }
};
