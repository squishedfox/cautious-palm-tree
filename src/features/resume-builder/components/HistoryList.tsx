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

  const deleteJobHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsDeleting(true);
    const [idToDelete]: Array<string> = event.currentTarget.id.split("-");

    setJobs((prev) => {
      // faster than props spread
      const newValue = Object.assign({}, prev);
      delete newValue[idToDelete];
      return newValue;
    });
    setIsDeleting(false);
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
      <ul title="Job History" className="space-y-4">
        {Object.entries(jobs).map(([id, job]) => (
          <li key={id}>
            <div className="flex place-content-between">
              <div className="inline-flex">
                <ChevronIcon direction="up" />
                <ChevronIcon direction="down" />
              </div>
              <div>
                <button
                  disabled={isDeleting}
                  aria-label="Delete job"
                  id={`${id}-delete-btn`}
                  onClick={deleteJobHandler}
                >
                  <TrashIcon />
                </button>
              </div>
            </div>
            <ErrorBoundary>
              <JobHistoryItem
                key={id}
                {...job}
                onCompanyNameChange={(newName) =>
                  companyChangehandler(id, newName)
                }
                onDateChange={(newDateRange) =>
                  dateChangeHandler(id, newDateRange)
                }
              />
            </ErrorBoundary>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryList;
