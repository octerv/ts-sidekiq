import React, { useEffect, useState } from "react";
import { RetryJobDetail } from "../types";
import { cellStyle, headerCellStyle, tableStyle } from "../styles";

interface Props {
  data: RetryJobDetail[];
  onSelectedJobs: (selectedJIDs: string[]) => void; // 選択されたジョブのJIDを処理するコールバック関数
}

const RetryTable = ({ data, onSelectedJobs }: Props) => {
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
          <th style={headerCellStyle}>Queue</th>
          <th style={headerCellStyle}>Error Message</th>
          <th style={headerCellStyle}>Failed At</th>
          <th style={headerCellStyle}>Retry Count</th>
        </tr>
      </thead>
      <tbody>
        {data.map((job) => (
          <tr key={job.jid}>
            <td style={cellStyle}>
              <input
                type="checkbox"
                onChange={(e) =>
                  handleCheckboxChange(job.jid, e.target.checked)
                }
              />
            </td>
            <td style={cellStyle}>{job.jid}</td>
            <td style={cellStyle}>{job.queue}</td>
            <td style={cellStyle}>{job.error_message}</td>
            <td style={cellStyle}>
              {new Date(job.failed_at * 1000).toLocaleString()}
            </td>
            <td style={cellStyle}>{job.retry_count}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RetryTable;
