import { createClient } from "redis";

const redisClient = async () => {
  return await createClient({ url: "redis://localhost:6379/5" })
    .on("error", (err) => console.error("Redis Clinet Error", err))
    .connect();
};

export const getSidekiqData = async () => {
  try {
    const client = await redisClient();

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

    const processSet = await client.sMembers("processes");
    const processData = await Promise.all(
      processSet.map(async (processKey) => {
        const processInfo = await client.hGetAll(processKey);
        return { processKey, processInfo };
      })
    );

    return { queues: queueData, stats: statsData, processes: processData };
  } catch (err) {
    console.error(err);
  }
};
