import React from "react";
import type { SidekiqRetryJob } from "../types/sidekiq";
import RetryJobsTable from "./components/retry-jobs-table";

interface Props {
  retryJobs: SidekiqRetryJob[];
  onSelectedJobs: (selectedJIDs: string[]) => void; // 選択されたジョブのJIDを処理するコールバック関数
}

const SidekiqRetry = ({ retryJobs, onSelectedJobs }: Props) => {
  return (
    <>
      <RetryJobsTable retryJobs={retryJobs} onSelectedJobs={onSelectedJobs} />
    </>
  );
};

export default SidekiqRetry;
