import React, { useEffect, useState } from "react";
import type { SidekiqJob } from "../../types/sidekiq";
import { cellStyle, headerCellStyle, tableStyle } from "../styles";

interface Props {
  jobs: SidekiqJob[];
  onSelectedJobs: (selectedJIDs: string[]) => void;
}

const QueueJobsTable: React.FC<Props> = ({ jobs, onSelectedJobs }) => {
  const [selectedJIDs, setSelectedJIDs] = useState<string[]>([]);

  const handleCheckboxChange = (jid: string, isChecked: boolean) => {
    if (isChecked) {
      // JIDを選択されたJIDのリストに追加
      setSelectedJIDs([...selectedJIDs, jid]);
    } else {
      // JIDを選択されたJIDのリストから削除
      setSelectedJIDs(
        selectedJIDs.filter((selectedJID) => selectedJID !== jid)
      );
    }
  };

  // チェックボックスの状態が変更されるたびにコールバックを呼び出す
  useEffect(() => {
    onSelectedJobs(selectedJIDs);
  }, [selectedJIDs, onSelectedJobs]);

  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          <th style={headerCellStyle}>Select</th>
          <th style={headerCellStyle}>JID</th>
          <th style={headerCellStyle}>Class</th>
          <th style={headerCellStyle}>Queue</th>
          <th style={headerCellStyle}>Arguments</th>
          <th style={headerCellStyle}>Retry</th>
          <th style={headerCellStyle}>Created At</th>
          <th style={headerCellStyle}>Enqueued At</th>
        </tr>
      </thead>
      <tbody>
        {jobs.map((job, index) => (
          <tr key={index}>
            <td style={cellStyle}>
              <input
                type="checkbox"
                onChange={(e) =>
                  handleCheckboxChange(job.jid, e.target.checked)
                }
              />
            </td>
            <td style={cellStyle}>{job.jid}</td>
            <td style={cellStyle}>{job.class}</td>
            <td style={cellStyle}>{job.queue}</td>
            <td style={cellStyle}>{JSON.stringify(job.args)}</td>
            <td style={cellStyle}>{job.retry ? "Yes" : "No"}</td>
            <td style={cellStyle}>
              {new Date(job.created_at * 1000).toLocaleString()}
            </td>
            <td style={cellStyle}>
              {new Date(job.enqueued_at * 1000).toLocaleString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default QueueJobsTable;
