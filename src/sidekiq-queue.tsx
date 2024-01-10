import React from "react";
import { SidekiqJob } from "../types/sidekiq";
import QueueJobsTable from "./components/queue-jobs-table";

interface Props {
  jobs: SidekiqJob[];
}

const SidekiqQueue = ({ jobs }: Props) => {
  return (
    <>
      <QueueJobsTable jobs={jobs} />
    </>
  );
};

export default SidekiqQueue;
