import React from "react";
import type {
  SidekiqProcess,
  SidekiqProcessInfoDetail,
} from "../../types/sidekiq";
import { tableStyle, cellStyle, headerCellStyle } from "../styles";

type QueueInfo = {
  [queue: string]: {
    processCount: number;
    threadCount: number;
  };
};

interface Props {
  processes: SidekiqProcess[];
}

const ProcessesTable: React.FC<Props> = ({ processes }) => {
  // キューごとのプロセス数とスレッド数を集計
  const queueInfo = processes.reduce<QueueInfo>((acc, process) => {
    const detail: SidekiqProcessInfoDetail = JSON.parse(
      process.processInfo.info
    );
    if (detail && detail.queues) {
      detail.queues.forEach((queue) => {
        if (!acc[queue]) {
          acc[queue] = { processCount: 0, threadCount: 0 };
        }
        acc[queue].processCount += 1;
        acc[queue].threadCount += detail.concurrency;
      });
    }
    return acc;
  }, {});

  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          <th style={headerCellStyle}>Queue</th>
          <th style={headerCellStyle}>Process Count</th>
          <th style={headerCellStyle}>Thread Count</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(queueInfo).map(
          ([queue, { processCount, threadCount }], index) => (
            <tr key={index}>
              <td style={cellStyle}>{queue}</td>
              <td style={cellStyle}>{processCount}</td>
              <td style={cellStyle}>{threadCount}</td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
};

export default ProcessesTable;
