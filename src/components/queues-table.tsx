import React from "react";
import type { SidekiqQueue } from "../types";
import { tableStyle, cellStyle, headerCellStyle, linkStyle } from "../styles";

interface Props {
  queues: SidekiqQueue[];
  onKeyClick?: (key: string) => void;
}

const QueuesTable: React.FC<Props> = ({ queues, onKeyClick }) => (
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
            <td style={cellStyle}>
              {onKeyClick ? (
                <span style={linkStyle} onClick={() => onKeyClick(queue.queue)}>
                  {queue.queue}
                </span>
              ) : (
                <>{queue.queue}</>
              )}
            </td>
            <td style={cellStyle}>{queue.size}</td>
          </tr>
        ))
      )}
    </tbody>
  </table>
);

export default QueuesTable;
