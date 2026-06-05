import { useState, type MouseEvent } from "react";
import type { JobHistoryListItem } from "../types";
import JobHistoryItem from "./HistoryListItem";
import { ulid } from "ulid";

const createEmptyJobHistoryItem = (): JobHistoryListItem => ({
  companyName: "",
  startDate: new Date().toLocaleDateString(),
  endDate: "",
  isCurrent: true,
});

const HistoryList = () => {
  const [jobs, setJobs] = useState<object>({});

  const addJobHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setJobs((prev) => ({
      ...prev,
      [ulid()]: createEmptyJobHistoryItem(),
    }));
  }

  return (<div>
    <div className="w-full">
      <button onClick={addJobHandler}>Add Job</button>
    </div>
    <ul title="Job History" className="space-y-4">
      {Object.entries(jobs).map(([id, job]) => (
        <li key={id} className="bg-gray-400">
          <div className="flex place-content-between">
            <div>
              <span>Up Arrow Chvron here</span>
              <span>Down Arrow Chvron here</span>
            </div>
            <div>
              <button>Trash Button Here</button>
            </div>
          </div>
          <JobHistoryItem {...job} />
        </li>
      ))}
    </ul>
  </div>);
};

export default HistoryList;
