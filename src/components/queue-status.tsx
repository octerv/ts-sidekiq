import React from "react";
import type { Queue } from "../types";

interface Props {
  queues: Queue[];
}

const QueueStatus = ({ queues }: Props) => {
  // コンソール出力にオブジェクトの内容を正しく表示するために JSON.stringify を使用
  console.log(`queues: ${JSON.stringify(queues)}`);

  return (
    <div>
      <h2>Queue Status</h2>
      <ul>
        {queues.length === 0 ? (
          <li>No queues available</li>
        ) : (
          queues.map((queue, index) => (
            <li key={index}>{`${queue.queue}: ${queue.size} job(s)`}</li>
          ))
        )}
      </ul>
    </div>
  );
};

export default QueueStatus;
