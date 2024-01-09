import React, { useEffect, useState } from "react";
import Dashboard from "../src/dashboard";
import RetryTable from "../src/components/retry-table";
import { Data, RetryJobDetail } from "../src/types";

export default {
  title: "Dashboard",
  component: Dashboard,
};

export const Default = () => {
  const [data, setData] = useState<Data>({
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
  return <Dashboard data={data} />;
};

export const Retry = () => {
  const [data, setData] = useState<RetryJobDetail[]>([]);
  const [jids, setJids] = useState<string[]>([]);

  useEffect(() => {
    fetch("http://localhost:3003/sidekiq/retry")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
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
          body: JSON.stringify({ jids }), // サーバーに送るデータ
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Failed to delete the job:", error);
      alert("Failed to delete the job");
    }
  };
  return (
    <>
      <button onClick={deleteJobs}>Delete Jobs</button>
      <RetryTable data={data} onSelectedJobs={onSelectedJobs} />
    </>
  );
};
