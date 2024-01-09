import React from "react";
import QueueStatus from "./components/queue-status";
import Statistics from "./components/statistics";
import Processes from "./components/processes";
import { Data } from "./types";
import StatsLineChart from "./components/stats-line-chart";
import CronStats from "./components/cron-stats";

interface Props {
  data: Data;
}

const Dashboard = ({ data }: Props) => {
  return (
    <div>
      <h1>Sidekiq Dashboard</h1>
      <QueueStatus queues={data.queues} />
      <Processes processes={data.processes} />
      <Statistics stats={data.stats} />
      <StatsLineChart stats={data.stats} />
      <CronStats cronJobs={data.cronJobs} />
    </div>
  );
};

export default Dashboard;
