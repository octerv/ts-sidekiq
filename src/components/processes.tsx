import React from "react";
import type { Info, Process } from "../types";
import { tableStyle, cellStyle, headerCellStyle } from "../styles";

type QueueInfo = {
  [queue: string]: {
    processCount: number;
    threadCount: number;
  };
};

interface Props {
  processes: Process[];
}

const Processes = ({ processes }: Props) => {
  // キューごとのプロセス数とスレッド数を集計
  const queueInfo = processes.reduce<QueueInfo>((acc, process) => {
    const info: Info = JSON.parse(process.processInfo.info);
    if (info && info.queues) {
      info.queues.forEach((queue) => {
        if (!acc[queue]) {
          acc[queue] = { processCount: 0, threadCount: 0 };
        }
        acc[queue].processCount += 1;
        acc[queue].threadCount += info.concurrency;
      });
    }
    return acc;
  }, {});

  return (
    <div>
      <h2>Processes</h2>
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
    </div>
  );
};

export default Processes;
