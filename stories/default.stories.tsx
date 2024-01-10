import React, { useEffect, useState } from "react";
import { SidekiqDashboard, SidekiqRetry, SidekiqQueue } from "../src/client";
import type {
  SidekiqDashboardData,
  SidekiqJob,
  SidekiqRetryJob,
} from "../types/sidekiq";

export default {
  title: "Dashboard",
  component: SidekiqDashboard,
};

export const Default = () => {
  const [data, setData] = useState<SidekiqDashboardData>({
    queues: [],
    stats: [],
    processes: [],
    cronJobs: [],
  });
  useEffect(() => {
    fetch("http://localhost:3003/sidekiq")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  }, []);
  const onClick = (key: string) => {
    console.log(key);
  };
  return (
    <>
      <h1>Sidekiq Dashboard</h1>
      <SidekiqDashboard data={data} onKeyClick={onClick} />
    </>
  );
};

export const Retry = () => {
  const [jobs, setJobs] = useState<SidekiqRetryJob[]>([]);
  const [jids, setJids] = useState<string[]>([]);

  useEffect(() => {
    fetch("http://localhost:3003/sidekiq/retry")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setJobs(data);
      });
  }, []);

  const onSelectedJobs = (selectedJids: string[]) => {
    setJids(selectedJids);
  };

  const deleteJobs = async () => {
    try {
      const response = await fetch(
        "http://localhost:3003/sidekiq/retry/delete",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ jids }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error("Failed to delete the job:", error);
      alert("Failed to delete the job");
    }
  };
  return (
    <>
      <h1>Sidekiq Retry</h1>
      <button onClick={deleteJobs}>Delete Jobs</button>
      <SidekiqRetry retryJobs={jobs} onSelectedJobs={onSelectedJobs} />
    </>
  );
};

export const Queue = () => {
  const [jobs, setJobs] = useState<SidekiqJob[]>([]);
  useEffect(() => {
    fetch("http://localhost:3003/sidekiq/queue", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ queueName: "separating" }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setJobs(data);
      });
  }, []);
  return (
    <>
      <h1>Sidekiq Queue</h1>
      <SidekiqQueue jobs={jobs} />
    </>
  );
};
