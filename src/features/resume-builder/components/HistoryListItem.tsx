import { type ChangeEvent, type MouseEvent } from "react";
import {
  ChevronIcon,
  EditableField,
  SquarePlusIcon,
  TrashIcon,
  XmarkIcon,
} from "@app/components";
import { useJob } from "../context";

export interface JobHistoryItemProps {
  jobId: string;
  /**
   * Any additional classes to apply to the container element
   */
  className?: string;
}

const JobHistoryItem = ({ jobId: id, className }: JobHistoryItemProps) => {
  const {
    job,
    dateChanged,
    removeJob,
    companyNameChanged,
    addExperience,
    updateExperience,
    removeExperience,
  } = useJob(id);

  const onAddExperienceClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    addExperience();
  };

  const deleteJobHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    removeJob();
  };

  const experienceChangedHandler = (event: ChangeEvent<HTMLInputElement>) =>
    updateExperience(event.target.name, event.target.value);
  const employmentDateChangedHandler = ([start, end]: [string, string]) =>
    dateChanged([start, end]);
  const removeExperienceHandler = (experienceId: string) =>
    removeExperience(experienceId);
  const companyNameChangeHandler = (newCompanyName: string) =>
    companyNameChanged(newCompanyName);

  return (
    <div className={className}>
      <div>
        <div className="flex grow place-content-between">
          <EditableField
            value={job.companyName}
            type="text"
            onChanged={(companyName) =>
              companyNameChangeHandler(companyName as string)
            }
          >
            <strong>{job.companyName}</strong>
          </EditableField>
          <button
            title={`delete "${job.companyName}" and all related details`}
            aria-label="Delete job"
            onClick={deleteJobHandler}
          >
            <TrashIcon size="sm" />
          </button>
        </div>
        <p className="flex gap-x-1">
          <EditableField
            value={job.startDate}
            type="date"
            onChanged={(newDate) =>
              employmentDateChangedHandler([
                newDate as string,
                job.endDate as string,
              ])
            }
          >
            <span>{job.startDate}</span>
          </EditableField>
          <span>-</span>
          <EditableField
            value={job.endDate}
            type="date"
            onChanged={(newEndDate) =>
              employmentDateChangedHandler([
                job.startDate,
                newEndDate as string,
              ])
            }
          >
            <span>{job.endDate ? job.endDate : "Current"}</span>
          </EditableField>
        </p>
      </div>
      <ul className="space-y-2">
        {Object.entries(job.experience).map(([id, text]) => (
          <li key={id}>
            <div className="flex items-center gap-x-1">
              <div className="content-start">
                <ChevronIcon size="sm" direction="up" />
                <ChevronIcon size="sm" direction="down" />
              </div>
              <input
                placeholder="Implemented data driven features using analytical tools such as amplitude, clarity, google analtyics, etc."
                type="text"
                className="flex-1 border border-gray-800 px-1 py-0.5"
                id={id}
                name={id}
                maxLength={250}
                value={text}
                onChange={experienceChangedHandler}
              />
              <button
                title="delete experience"
                role="button"
                onClick={() => removeExperienceHandler(id)}
              >
                <XmarkIcon size="sm" />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex grow items-center">
        <hr className="flex-1" />
        <button
          aria-label="add experience"
          onClick={onAddExperienceClick}
          className="grow-0"
        >
          <SquarePlusIcon size="md" />
        </button>
      </div>
    </div>
  );
};

export default JobHistoryItem;
