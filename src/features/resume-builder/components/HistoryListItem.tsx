import { useState, type ChangeEvent, type MouseEvent } from "react";
import { ulid } from "ulid";
import { ChevronIcon, EditableField, XmarkIcon } from "@app/components";

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
}

const JobHistoryItem = ({
  companyName: companyNameProp,
  startDate,
  endDate,
  onCompanyNameChange,
  onDateChange,
}: JobHistoryItemProps) => {
  // in this portion we use our own client ulid objects so that we can
  // have a sane way of mapping these
  const [experienceList, setExperienceList] = useState<object>({});

  const onTextAreaChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setExperienceList((prev: object) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const onAddExperienceClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setExperienceList((prev) => ({
      ...prev,
      [ulid()]: "",
    }));
  };

  const handleDateChanged = ([start, end]: [string, string]) => {
    onDateChange?.([start, end]); 
  };

  return (
    <div className="bg-white p-1">
      <div role="group">
        <p>
          <EditableField
            value={companyNameProp}
            type="text"
            onChanged={(companyName) =>
              onCompanyNameChange?.(companyName as string)
            }
          >
            <strong>{companyNameProp}</strong>
          </EditableField>
        </p>
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
      <div>
        <button onClick={onAddExperienceClick}>Add Experience</button>
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
                type="text"
                className="flex-1 border-gray-800 border"
                id={id}
                name={id}
                maxLength={250}
                value={text}
                onChange={onTextAreaChanged}
                />
              <XmarkIcon size="sm" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobHistoryItem;
