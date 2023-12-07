import React, { useEffect } from "react";
import Dashboard from "../src/dashboard";

export default {
  title: "Dashboard",
  component: Dashboard,
};

export const Default = () => {
  useEffect(() => {
    fetch("http://localhost:3003/sidekiq")
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, []);
  return <Dashboard />;
};
