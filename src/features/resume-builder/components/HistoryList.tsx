import { useState, type MouseEvent } from "react";
import type { JobHistoryListItem } from "../types";
import JobHistoryItem from "./HistoryListItem";
import { ulid } from "ulid";
import { TrashIcon, ChevronIcon } from "@app/components/icons";
import { ErrorBoundary } from "@/components";

const createEmptyJobHistoryItem = (): JobHistoryListItem => ({
  companyName: "Company Name Here",
  startDate: new Date().toLocaleDateString(),
  endDate: "",
  isCurrent: true,
});

const HistoryList = () => {
  const [jobs, setJobs] = useState<Record<string, JobHistoryListItem>>({});
  const [isDeleting, setIsDeleting] = useState(false);

  const addJobHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setJobs((prev) =>
      Object.assign({}, prev, {
        [ulid()]: createEmptyJobHistoryItem(),
      }),
    );
  };

  const deleteJobHandler = (idToDelete: string) => {
    setJobs((prev) => {
      // faster than props spread
      const newValue = Object.assign({}, prev);
      delete newValue[idToDelete];
      return newValue;
    });
  };

  const companyChangehandler = (id: string, newName: string) => {
    setJobs((prev) => {
      // faster than props spread
      const newValue = Object.assign({}, prev)
      newValue[id] = Object.assign({}, prev[id], { companyName: newName })
      return newValue; 
    });
  };

  const dateChangeHandler = (
    id: string,
    range: [string, string | undefined],
  ) => {
    setJobs((prev) => {
      const newValue = Object.assign({}, prev)
      newValue[id] = Object.assign({}, prev[id], { 
        startDate: range[0],
        endDate: range[1] 
      })
      return newValue;
    });
  };

  return (
    <div>
      <div className="w-full">
        <button onClick={addJobHandler}>Add Job</button>
      </div>
      <ul className="space-y-4">
        {Object.entries(jobs).map(([id, job]) => (
          <li key={id} className="flex items-start gap-x-1">
            <div>
              <ChevronIcon direction="up" />
              <ChevronIcon direction="down" />
            </div>
            <ErrorBoundary>
              <JobHistoryItem
                {...job}
                className="bg-white py-1 px-2 grow boder border-l-gray-800"
                key={id}
                onCompanyNameChange={(newName) =>
                  companyChangehandler(id, newName)
                }
                onDateChange={(newDateRange) =>
                  dateChangeHandler(id, newDateRange)
                }
                onDelete={() => deleteJobHandler(id)}
              />
            </ErrorBoundary>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryList;
