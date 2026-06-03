import { useState } from "react";
import type { MouseEvent } from "react";

export interface ResumeBuilderForm {
  about: string;
}
const ResumeBuilder = () => {
  const [formValue, setFormValue] = useState<ResumeBuilderForm>({
    about: "",
  });

  const addHistoryHandler = (_: MouseEvent<HTMLButtonElement>) => {
    // TODO: add more job history information to the form
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
      <fieldset>
        <legend>About</legend>
        <textarea
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
      <fieldset>
        <legend>Jobs</legend>
        <button type="button">Add Job</button>
      </fieldset>
      <div role="group" className="inline-flex">
        <button className="bg-blue-400">Save</button>
        <button className="bg-blue-800">Save and Export</button>
      </div>
    </form>
  );
};

export default ResumeBuilder;
