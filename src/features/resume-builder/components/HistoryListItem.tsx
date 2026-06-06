import { useState, type ChangeEvent, type MouseEvent } from "react";
import { ulid } from "ulid";
import { ChevronIcon, EditableField } from "@app/components";

export interface JobHistoryItemProps {
  companyName: string;
  startDate: string;
  endDate?: string;
}

const JobHistoryItem = ({
  companyName: companyNameProp,
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
        <p>
          <EditableField value={companyNameProp} type="text" onChanged={(companyName) => console.log("company name", companyName)}>
            <strong>{companyNameProp}</strong>
          </EditableField>
        </p>
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
