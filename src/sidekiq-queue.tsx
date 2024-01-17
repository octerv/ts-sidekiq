import React from "react";
import type { SidekiqJob } from "../types/sidekiq";
import QueueJobsTable from "./components/queue-jobs-table";

interface Props {
  jobs: SidekiqJob[];
  onSelectedJobs: (selectedJIDs: string[]) => void; // 選択されたジョブのJIDを処理するコールバック関数
}

const SidekiqQueue = ({ jobs, onSelectedJobs }: Props) => {
  return (
    <>
      <QueueJobsTable jobs={jobs} onSelectedJobs={onSelectedJobs} />
    </>
  );
};

export default SidekiqQueue;
