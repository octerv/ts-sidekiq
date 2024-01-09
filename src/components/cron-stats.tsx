import React from "react";
import { CronJob } from "../types";
import CronTable from "./cron-table";
import CronLineChart from "./cron-line-chart";

interface GraphDataPoint {
  name: string; // 日付を表す
  value: number; // その日の実行回数を表す
}

interface Props {
  cronJobs: CronJob[];
}

const CronStats: React.FC<Props> = ({ cronJobs }) => {
  // スケジュール定義のみをフィルタリング
  const scheduleJobs = cronJobs.filter(
    (job) => !job.key.includes("jid_history") && !job.key.includes("enqueued")
  );

  return (
    <div>
      <CronTable cronJobs={scheduleJobs} />
    </div>
  );
};

export default CronStats;
