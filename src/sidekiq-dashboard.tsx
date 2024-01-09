import React from "react";
import QueuesTable from "./components/queues-table";
import StatisticsTable from "./components/statistics-table";
import ProcessesTable from "./components/processes-table";
import { SidekiqDashboardData } from "./types";
import StatsLineChart from "./components/stats-line-chart";
import CronsTable from "./components/crons-table";

interface Props {
  data: SidekiqDashboardData;
  onKeyClick?: (key: string) => void;
}

const SidekiqDashboard = ({ data, onKeyClick }: Props) => {
  return (
    <>
      <h2>Queue Status</h2>
      <QueuesTable queues={data.queues} onKeyClick={onKeyClick} />
      <h2>Processes</h2>
      <ProcessesTable processes={data.processes} />
      <h2>Statistics</h2>
      <StatisticsTable stats={data.stats} onKeyClick={onKeyClick} />
      <StatsLineChart stats={data.stats} />
      <h2>Cron</h2>
      <CronsTable cronJobs={data.cronJobs} />
    </>
  );
};

export default SidekiqDashboard;
