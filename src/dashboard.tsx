import React from "react";
import QueueStatus from "./components/queue-status";
import Statistics from "./components/statistics";
import Processes from "./components/processes";
import { Data } from "./types";

interface Props {
  data: Data;
}

const Dashboard = ({ data }: Props) => {
  return (
    <div>
      <h1>Sidekiq Dashboard</h1>
      <QueueStatus queues={data.queues} />
      <Statistics stats={data.stats} />
      <Processes processes={data.processes} />
    </div>
  );
};

export default Dashboard;
