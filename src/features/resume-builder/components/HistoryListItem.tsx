import { ChevronIcon } from "@/components";
import { useState, type ChangeEvent, type MouseEvent } from "react";
import { ulid } from "ulid";

export interface JobHistoryItemProps {
  companyName: string;
  startDate: string;
  endDate?: string;
}

const JobHistoryItem = ({
  companyName,
  startDate,
  endDate,
}: JobHistoryItemProps) => {

  // in this portion we use our own client ulid objects so that we can
  // have a sane way of mapping these
  const [experienceList, setExperienceList] = useState<object>({});

  const onTextAreaChanged = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setExperienceList((prev: object) => ({
      ...prev,
      [event.currentTarget.name]: event.currentTarget.value,
    }))
  }

  const onAddExperienceClick = (_: MouseEvent<HTMLButtonElement>) => {
    setExperienceList((prev) => ({
      ...prev,
      [ulid()]: "",
    }));
  }

  return (
    <div className="bg-white p-1">
      <div role="group">
        <p><strong>{companyName}</strong></p>
        <p className="flex">
          {startDate} -{" "}
          {Boolean(endDate) ? endDate : "Current"}
        </p>
      </div>
      <div>
        <button onClick={onAddExperienceClick}>Add Experience</button>
      </div>
      <ul>
        {Object.entries(experienceList).map(([id, text]) => (<li key={id}>
          <div className="flex">
            <div className="flex-1">
              <ChevronIcon direction="up" />
              <ChevronIcon direction="down" />
            </div>
            <div className="grow">
              <textarea id={id} name={id} maxLength={250} value={text} onChange={onTextAreaChanged} />
              <p><em>{250 - (text as string).length}</em></p>
            </div>
          </div>
        </li>))} 
      </ul>
    </div>
  );
};

export default JobHistoryItem;
