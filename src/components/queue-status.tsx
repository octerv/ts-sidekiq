import React from "react";
import type { Queue } from "../types";
import { tableStyle, cellStyle, headerCellStyle } from "../styles";

interface Props {
  queues: Queue[];
}

const QueueStatus = ({ queues }: Props) => {
  return (
    <div>
      <h2>Queue Status</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={headerCellStyle}>Queue Name</th>
            <th style={headerCellStyle}>Jobs</th>
          </tr>
        </thead>
        <tbody>
          {queues.length === 0 ? (
            <tr>
              <td colSpan={2} style={cellStyle}>
                No jobs
              </td>
            </tr>
          ) : (
            queues.map((queue, index) => (
              <tr key={index}>
                <td style={cellStyle}>{queue.queue}</td>
                <td style={cellStyle}>{queue.size}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default QueueStatus;
