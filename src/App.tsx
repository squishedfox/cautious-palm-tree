import { ExportIcon } from "@app/components/icons";
import { ResumeBuilder } from "@app/features";

const App = () => (
  <main className="flex min-h-screen flex-row px-1">
    <div className="min-h-full flex-1/2 overflow-y-scroll border-r-2 border-r-gray-800 bg-gray-200">
      <ResumeBuilder />
    </div>
    <div className="ml-2 min-h-full flex-1/2 overflow-y-scroll">
      <h1>Preview Goes Here</h1>
      <button aria-description="export resume to pdf" role="button"><ExportIcon /></button>
    </div>
  </main>
);

export default App;
