import { useState, type ChangeEvent, type MouseEvent } from "react";
import { ulid } from "ulid";
import { ChevronIcon, EditableField } from "@app/components";

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

  const onTextAreaChanged = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setExperienceList((prev: object) => ({
      ...prev,
      [event.currentTarget.name]: event.currentTarget.value,
    }));
  };

  const onAddExperienceClick = (_: MouseEvent<HTMLButtonElement>) => {
    setExperienceList((prev) => ({
      ...prev,
      [ulid()]: "",
    }));
  };

  const handleDateChanged = ([start, end]: [string, string | undefined]) => {
    const startFormatted = new Date(start).toLocaleDateString();
    let endFormatted: string|undefined = undefined;
    if (end) {
      endFormatted = new Date(end).toLocaleDateString(); 
    }

    onDateChange?.([startFormatted, endFormatted]); 
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
              handleDateChanged([newDate as string, endDate])
            }
          >
            <span>{startDate}</span>
          </EditableField>
          <span>-</span>
          <EditableField
            value={endDate}
            type="date"
            onChanged={(newEndDate) =>
              handleDateChanged([startDate, newEndDate as string | undefined])
            }
          >
            <span>{Boolean(endDate) ? endDate : "Current"}</span>
          </EditableField>
        </p>
      </div>
      <div>
        <button onClick={onAddExperienceClick}>Add Experience</button>
      </div>
      <ul>
        {Object.entries(experienceList).map(([id, text]) => (
          <li key={id}>
            <div className="flex">
              <div className="flex-1">
                <ChevronIcon direction="up" />
                <ChevronIcon direction="down" />
              </div>
              <div className="grow">
                <textarea
                  id={id}
                  name={id}
                  maxLength={250}
                  value={text}
                  onChange={onTextAreaChanged}
                />
                <p>
                  <em>{250 - (text as string).length}</em>
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobHistoryItem;
