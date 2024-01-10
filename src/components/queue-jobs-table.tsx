import React from "react";
import type { SidekiqJob } from "../../types/sidekiq";
import { cellStyle, headerCellStyle, tableStyle } from "../styles";

interface Props {
  jobs: SidekiqJob[];
}

const QueueJobsTable: React.FC<Props> = ({ jobs }) => (
  <table style={tableStyle}>
    <thead>
      <tr>
        <th style={headerCellStyle}>JID</th>
        <th style={headerCellStyle}>Class</th>
        <th style={headerCellStyle}>Queue</th>
        <th style={headerCellStyle}>Arguments</th>
        <th style={headerCellStyle}>Retry</th>
        <th style={headerCellStyle}>Created At</th>
        <th style={headerCellStyle}>Enqueued At</th>
      </tr>
    </thead>
    <tbody>
      {jobs.map((job, index) => (
        <tr key={index}>
          <td style={cellStyle}>{job.jid}</td>
          <td style={cellStyle}>{job.class}</td>
          <td style={cellStyle}>{job.queue}</td>
          <td style={cellStyle}>{JSON.stringify(job.args)}</td>
          <td style={cellStyle}>{job.retry ? "Yes" : "No"}</td>
          <td style={cellStyle}>
            {new Date(job.created_at * 1000).toLocaleString()}
          </td>
          <td style={cellStyle}>
            {new Date(job.enqueued_at * 1000).toLocaleString()}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default QueueJobsTable;
