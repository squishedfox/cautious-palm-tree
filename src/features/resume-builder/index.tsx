import { useState, type ChangeEvent } from "react";
import { type JobHistoryListItem } from "@app/types";
import { About, HistoryList } from "./components";
import { createEmptyJobHistoryItem } from "./utils";
import { ulid } from "ulid";
import type { ResumeBuilderFormValue } from "./types";
import { ResumeBuilderFormProvider } from "./context";

export interface ResumeBuilderFormProps {
  onChange: (formValue: ResumeBuilderFormValue) => void;
}

const ResumeBuilder = ({ onChange }: ResumeBuilderFormProps) => {
  return (
    <ResumeBuilderFormProvider onChange={onChange}>
      <form name="job-history-form" className="space-y-2">
        <fieldset
          className="min-w-full border border-gray-800 bg-white p-2"
          aria-labelledby="about-section-heading"
        >
          <About />
        </fieldset>
        <fieldset>
          <HistoryList />
        </fieldset>
      </form>
    </ResumeBuilderFormProvider>
  );
};

export default ResumeBuilder;
