import React from "react";
import { Stat } from "../types";

interface Props {
  stats: Stat[];
}

const Statistics = ({ stats }: Props) => {
  return (
    <div>
      <h2>Statistics</h2>
      <ul>
        {stats.map((stat, index) => (
          <li key={index}>{`${stat.stat}: ${stat.value}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default Statistics;
