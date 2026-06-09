import { ResumeBuilder, Preview } from "@app/features";
import { SaveIcon, ExportIcon } from "@app/components/icons";
import { useCallback, useState } from "react";
import type { ResumeBuilderFormValue } from "./features/resume-builder/types";

const App = () => {
  const [resume, setResume] = useState<ResumeBuilderFormValue>({
    about: "",
    jobHistory: [],
  });

  const resumeChangedHandler = useCallback(
    (newValue: ResumeBuilderFormValue) => {
      setResume(newValue);
    },
    [],
  );

  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex flex-1 px-1">
        <div className="w-1/2 border-r-2 border-r-gray-800 bg-gray-200 p-4">
          <ResumeBuilder onChange={resumeChangedHandler} />
        </div>
        <div className="w-1/2 p-4">
          <Preview about={resume.about} jobs={resume.jobHistory} />
        </div>
      </div>
      <footer className="flex grow-0 flex-row items-center justify-end gap-4 border border-gray-800 py-4 pr-4">
        <button>
          <ExportIcon size="lg" />
        </button>
        <button>
          <SaveIcon size="lg" />
        </button>
      </footer>
    </main>
  );
};

export default App;
