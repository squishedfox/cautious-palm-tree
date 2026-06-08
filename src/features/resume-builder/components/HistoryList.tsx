import { type MouseEvent } from "react";
import JobHistoryItem from "./HistoryListItem";
import { ChevronIcon, PlusIcon } from "@app/components/icons";
import { ErrorBoundary } from "@app/components";
import { useResumseBuilderForm } from "../context";

const HistoryList = () => {
  const { jobs, addJob } = useResumseBuilderForm();

  const addJobHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    addJob();
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
        {Object.keys(jobs).map((id) => (
          <li key={id} className="flex items-start gap-x-1">
            <div className="pt-1">
              <ChevronIcon size="sm" direction="up" />
              <ChevronIcon size="sm" direction="down" />
            </div>
            <ErrorBoundary>
              <JobHistoryItem
                className="grow space-y-2 border border-l-gray-800 bg-white px-2 py-2"
                key={id}
                jobId={id}
              />
            </ErrorBoundary>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryList;
