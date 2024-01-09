import React from "react";
import { CronJob } from "../types";
import { cellStyle, headerCellStyle, tableStyle } from "../styles";

interface Props {
  cronJobs: CronJob[];
}

const CronTable: React.FC<Props> = ({ cronJobs }) => (
  <div>
    <h2>Cron</h2>
    <table style={tableStyle}>
      <thead>
        <tr>
          <th style={headerCellStyle}>Name</th>
          <th style={headerCellStyle}>Cron</th>
          <th style={headerCellStyle}>Last queued at</th>
        </tr>
      </thead>
      <tbody>
        {cronJobs.map((job, index) => (
          <tr key={index}>
            <td style={cellStyle}>{job.key.replace("cron_job:", "")}</td>
            <td style={cellStyle}>{job.details?.cron}</td>
            <td style={cellStyle}>{job.details?.last_enqueue_time}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default CronTable;
