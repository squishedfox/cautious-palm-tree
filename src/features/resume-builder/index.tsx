import { useState } from "react";
import type { JobHistoryListItem } from "./types";
import { HistoryList } from "./components";
import { ExportIcon, SaveIcon } from "@/components/icons";

export interface ResumeBuilderForm {
  about: string;
  jobHistoryItems: JobHistoryListItem[];
}

const ResumeBuilder = () => {
  const [about, setAbout] = useState<string>("");

  return (
    <form name="job-history" className="gap-1 px-1 pt-4 space-y-2">
      <fieldset className="min-w-full bg-white p-1" aria-description="About Section">
        <h1>About</h1>
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
        <button role="button"><SaveIcon /></button>
      </div>
    </form>
  );
};

export default ResumeBuilder;
