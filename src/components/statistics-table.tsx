import React from "react";
import type { SidekiqStat } from "../../types/sidekiq";
import { tableStyle, cellStyle, headerCellStyle, linkStyle } from "../styles";

interface Props {
  stats: SidekiqStat[];
  onKeyClick?: (key: string) => void;
}

const StatisticsTable: React.FC<Props> = ({ stats, onKeyClick }) => {
  // 日付を含むデータをフィルタリングする
  const filteredStats = stats.filter((stat) => !stat.stat.includes(":"));

  return (
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
            <td style={cellStyle}>
              {onKeyClick ? (
                <span style={linkStyle} onClick={() => onKeyClick(stat.stat)}>
                  {stat.stat}
                </span>
              ) : (
                <>{stat.stat}</>
              )}
            </td>
            <td style={cellStyle}>{stat.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StatisticsTable;
