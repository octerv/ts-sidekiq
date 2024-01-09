import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { containerStyle } from "../styles";

export type Stat = {
  stat: string;
  value: string;
};

type Props = {
  stats: Stat[];
  startDate?: string; // 開始日（オプショナル）
  endDate?: string; // 終了日（オプショナル）
};

const processData = (stats: Stat[], startDate?: string, endDate?: string) => {
  const processed: { [date: string]: number } = {};
  const failed: { [date: string]: number } = {};

  stats.forEach(({ stat, value }) => {
    const [type, date] = stat.split(":");
    if (!date) return; // 'processed' と 'failed' の累計値を無視
    if (type === "processed") {
      processed[date] = (processed[date] || 0) + parseInt(value);
    } else if (type === "failed") {
      failed[date] = (failed[date] || 0) + parseInt(value);
    }
  });

  // データを昇順にソートする
  const sortedData = Object.keys(processed)
    .map((date) => ({
      date,
      processed: processed[date] || 0,
      failed: failed[date] || 0,
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  let filteredData = sortedData;

  if (startDate || endDate) {
    const start = startDate
      ? new Date(startDate).getTime()
      : Number.MIN_SAFE_INTEGER;
    const end = endDate ? new Date(endDate).getTime() : Number.MAX_SAFE_INTEGER;
    filteredData = sortedData.filter((d) => {
      const date = new Date(d.date).getTime();
      return date >= start && date <= end;
    });
  } else {
    // 開始日と終了日の指定がない場合、直近3ヶ月分をフィルタリング
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    filteredData = sortedData.filter((d) => new Date(d.date) >= threeMonthsAgo);
  }

  return filteredData;
};

const StatsLineChart: React.FC<Props> = ({ stats, startDate, endDate }) => {
  const data = processData(stats, startDate, endDate);
  return (
    <div style={containerStyle}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="processed"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="failed" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatsLineChart;
