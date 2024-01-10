import React from "react";
import type { SidekiqCronJob } from "../../types/sidekiq";
import { cellStyle, headerCellStyle, tableStyle } from "../styles";

interface Props {
  cronJobs: SidekiqCronJob[];
}

const CronsTable: React.FC<Props> = ({ cronJobs }) => {
  // スケジュール定義のみをフィルタリング
  const scheduleJobs = cronJobs.filter(
    (job) => !job.key.includes("jid_history") && !job.key.includes("enqueued")
  );

  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          <th style={headerCellStyle}>Name</th>
          <th style={headerCellStyle}>Cron</th>
          <th style={headerCellStyle}>Last queued at</th>
        </tr>
      </thead>
      <tbody>
        {scheduleJobs.map((job, index) => (
          <tr key={index}>
            <td style={cellStyle}>{job.key.replace("cron_job:", "")}</td>
            <td style={cellStyle}>{job.details?.cron}</td>
            <td style={cellStyle}>{job.details?.last_enqueue_time}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CronsTable;
