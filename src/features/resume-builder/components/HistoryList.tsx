import { useState, type MouseEvent } from "react";
import type { JobHistoryListItem } from "../types";
import JobHistoryItem from "./HistoryListItem";
import { ulid } from "ulid";
import { TrashIcon, ChevronIcon, PlusIcon } from "@app/components/icons";
import { ErrorBoundary } from "@/components";

const createEmptyJobHistoryItem = (): JobHistoryListItem => ({
  companyName: "Company Name Here",
  startDate: new Date().toLocaleDateString(),
  endDate: "",
  isCurrent: true,
});

const HistoryList = () => {
  const [jobs, setJobs] = useState<Record<string, JobHistoryListItem>>({
    [ulid()]: createEmptyJobHistoryItem(),
  });

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
    <div className="space-y-2">
      <div className="flex grow items-center">
        <hr className="flex-1" />
        <button onClick={addJobHandler} className="grow-0">
          <PlusIcon />
        </button>
      </div>
      <ul className="space-y-4">
        {Object.entries(jobs).map(([id, job]) => (
          <li key={id} className="flex items-start gap-x-1">
            <div className="pt-1">
              <ChevronIcon size="sm" direction="up" />
              <ChevronIcon size="sm" direction="down" />
            </div>
            <ErrorBoundary>
              <JobHistoryItem
                {...job}
                className="bg-white py-2 px-2 grow border border-l-gray-800 space-y-2"
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
