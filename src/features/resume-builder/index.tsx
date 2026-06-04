import { useState } from "react";
import type { MouseEvent } from "react";
import type { JobHistoryListItem } from "./types";
import JobHistoryItem from "./components/HistoryListItem";

export interface ResumeBuilderForm {
  about: string;
  jobHistoryItems: JobHistoryListItem[];
}

const createEmptyJobHistoryItem = (): JobHistoryListItem => ({
  companyName: "",
  startDate: new Date().toLocaleDateString(),
  endDate: "",
  isCurrent: true,
});
const ResumeBuilder = () => {
  const [formValue, setFormValue] = useState<ResumeBuilderForm>({
    about: "",
    jobHistoryItems: [], // TODO: will need to initialize these
  });

  const addJobHandler = (_: MouseEvent<HTMLButtonElement>) => {
    // TODO: add more job history information to the form
    setFormValue(({ jobHistoryItems, ...restValues }) => ({
      ...restValues,
      jobHistoryItems: [...jobHistoryItems, createEmptyJobHistoryItem()],
    }));
  };

  /**
   * Updates the value on the form.
   * @param currentFormValue  pass the current value just incase there is a race condition of a re-render while updating the form
   * @param fieldName name of the field to update
   * @param newValue the new value
   */
  const setField = (
    currentFormValue: ResumeBuilderForm,
    fieldName: keyof ResumeBuilderForm,
    newValue: string,
  ) => {
    setFormValue({
      ...currentFormValue,
      [fieldName]: newValue,
    });
  };

  return (
    <form name="job-history">
      <fieldset className="min-w-full">
        <legend>About</legend>
        <textarea
          className="w-full border border-gray-800"
          id="about-input"
          name="about"
          value={formValue.about}
          onChange={(event) =>
            setField(formValue, "about", event.currentTarget.value)
          }
          maxLength={500}
        ></textarea>
        <p className="text-gray-500">
          <em>{500 - formValue.about.length} characters left</em>
        </p>
      </fieldset>
      <hr />
      <fieldset>
        <legend>Job History</legend>
        <button type="button" onClick={addJobHandler}>
          Add Job
        </button>
      </fieldset>
      {formValue.jobHistoryItems.map((item) => (
        <JobHistoryItem
          companyName={item.companyName}
          startDate={item.startDate}
          endDate={item.endDate}
        />
      ))}
      <div role="group" className="flex justify-end gap-1">
        <button role="button">Save</button>
        <button role="button">Save and Export</button>
      </div>
    </form>
  );
};

export default ResumeBuilder;
