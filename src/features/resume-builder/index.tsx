import { About, HistoryList } from "@app/features/resume-builder/components";
import type { ResumeBuilderFormValue } from "@app/features/resume-builder/types";
import { ResumeBuilderFormProvider } from "@app/features/resume-builder/state/context";

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
