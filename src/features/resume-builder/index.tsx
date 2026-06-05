import { useState } from "react";
import type { JobHistoryListItem } from "./types";
import { HistoryList } from "./components";

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
  const [about, setAbout] = useState<string>("");

  return (
    <form name="job-history">
      <fieldset className="min-w-full">
        <legend>About</legend>
        <textarea
          className="w-full border border-gray-800"
          id="about-input"
          name="about"
          value={about}
          onChange={(event) => setAbout(event.currentTarget.value)}
          maxLength={500}
        ></textarea>
        <p className="text-gray-500">
          <em>{500 - about.length} characters left</em>
        </p>
      </fieldset>
      <hr />
      <fieldset>
        <HistoryList /> 
      </fieldset>
      <div role="group" className="flex justify-end gap-1">
        <button role="button">Save</button>
        <button role="button">Save and Export</button>
      </div>
    </form>
  );
};

export default ResumeBuilder;
