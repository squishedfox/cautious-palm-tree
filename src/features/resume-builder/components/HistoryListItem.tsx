import { useState, type ChangeEvent, type MouseEvent } from "react";
import { ulid } from "ulid";
import { ChevronIcon, CirclePlusIcon, EditableField, TrashIcon, XmarkIcon } from "@app/components";

export interface JobHistoryItemProps {
  companyName: string;
  startDate: string;
  endDate?: string;
  onCompanyNameChange?: (newValue: string) => void;
  /**
   * Callback for when the start date or end date change.
   * @param [string, string] range - first element is start second element is end. If the end is undefined or empty the user cleared it out
   */
  onDateChange?: (range: [string, string | undefined]) => void;
  /**
   * Callback for when user deletes entire job history
   */
  onDelete?: () => void;
  /**
   * Any additional classes to apply to the container element
   */
  className?: string;
}

const JobHistoryItem = ({
  className,
  companyName: companyNameProp,
  startDate,
  endDate,
  onCompanyNameChange,
  onDateChange,
  onDelete,
}: JobHistoryItemProps) => {
  // in this portion we use our own client ulid objects so that we can
  // have a sane way of mapping these
  const [experienceList, setExperienceList] = useState<Record<string, string>>({
    [ulid()]: "",
  });

  const onTextAreaChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setExperienceList((prev: object) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const onAddExperienceClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setExperienceList((prev) => {
      const copy = Object.assign({}, prev);
      copy[ulid()] = "";
      return copy;
    });
  };

  const handleDateChanged = ([start, end]: [string, string]) => {
    onDateChange?.([start, end]); 
  };

  const deleteJobHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onDelete?.();    
  }

  const deleteExpereienceHandler = (experienceId: string) => {
    setExperienceList((prev) => {
      const copy = Object.assign({}, prev);
      delete copy[experienceId];
      return copy;
    });
  }

  return (
    <div className={className}>
      <div role="group">
      <div className="flex place-content-between grow">
        <EditableField
          value={companyNameProp}
          type="text"
          onChanged={(companyName) =>
            onCompanyNameChange?.(companyName as string)
          }
        >
          <strong>{companyNameProp}</strong>
        </EditableField>
        <button
          title={`delete "${companyNameProp}" and all related details`}
          aria-label="Delete job"
          onClick={deleteJobHandler}>
          <TrashIcon size="sm" />
        </button>
      </div>
        <p className="flex gap-x-1">
          <EditableField
            value={startDate}
            type="date"
            onChanged={(newDate) =>
              handleDateChanged([newDate as string, endDate as string])
            }
          >
            <span>{startDate}</span>
          </EditableField>
          <span>-</span>
          <EditableField
            value={endDate}
            type="date"
            onChanged={(newEndDate) =>
              handleDateChanged([startDate, newEndDate as string])
            }
          >
            <span>{endDate ? endDate : "Current"}</span>
          </EditableField>
        </p>
      </div>
      <ul className="space-y-2">
        {Object.entries(experienceList).map(([id, text]) => (
          <li key={id}>
            <div className="flex gap-x-1 items-center">
              <div className="content-start">
                <ChevronIcon size="sm" direction="up" />
                <ChevronIcon size="sm" direction="down" />
              </div>
              <input
                placeholder="Implemented data driven features using analytical tools such as amplitude, clarity, google analtyics, etc."
                type="text"
                className="flex-1 border-gray-800 border px-1 py-0.5"
                id={id}
                name={id}
                maxLength={250}
                value={text}
                onChange={onTextAreaChanged}
                />
              <button title="delete experience" role="button" onClick={() => deleteExpereienceHandler(id)}>
                <XmarkIcon size="sm" />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="border-t border-t-gray-800 pt-1 flex grow justify-end">
        <button aria-label="add experience" onClick={onAddExperienceClick}>
          <CirclePlusIcon size="md" />
        </button>
      </div>
    </div>
  );
};

export default JobHistoryItem;
