import React, { useEffect, useState } from "react";
import Dashboard from "../src/dashboard";
import { Data } from "../src/components/types";

export default {
  title: "Dashboard",
  component: Dashboard,
};

export const Default = () => {
  const [data, setData] = useState<Data>({
    queues: [],
    stats: [],
    processes: [],
  });
  useEffect(() => {
    fetch("http://localhost:3003/sidekiq")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);
  return <Dashboard data={data} />;
};
