import React from "react";
import type { Process } from "../types";

interface Props {
  processes: Process[];
}

const Processes = ({ processes }: Props) => {
  return (
    <div>
      <h2>Processes</h2>
      {processes.map((process, index) => (
        <div key={index}>
          <h3>{process.processKey}</h3>
          <p>RSS: {process.processInfo.rss}</p>
          <p>Busy: {process.processInfo.busy}</p>
        </div>
      ))}
    </div>
  );
};

export default Processes;
