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

  const setField = (fieldName: keyof ResumeBuilderForm, value: any) => void {
    setFormValue({
      ...formValue,
      [fieldName]: value,
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
