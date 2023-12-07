import React from "react";
import { Stat } from "../types";
import { tableStyle, cellStyle, headerCellStyle } from "../styles";

interface Props {
  stats: Stat[];
}

const Statistics = ({ stats }: Props) => {
  // 日付を含むデータをフィルタリングする
  const filteredStats = stats.filter((stat) => !stat.stat.includes(":"));

  return (
    <div>
      <h2>Statistics</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={headerCellStyle}>Statistic</th>
            <th style={headerCellStyle}>Value</th>
          </tr>
        </thead>
        <tbody>
          {filteredStats.map((stat, index) => (
            <tr key={index}>
              <td style={cellStyle}>{stat.stat}</td>
              <td style={cellStyle}>{stat.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Statistics;
