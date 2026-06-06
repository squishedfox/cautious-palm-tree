import { ResumeBuilder, Preview } from "@app/features";
import {SaveIcon, ExportIcon} from "@app/components/icons";

const App = () => (
  <main className="flex flex-col min-h-screen">
    <div className="flex px-1 flex-1">
      <div className="w-1/2 border-r-2 border-r-gray-800 bg-gray-200 p-4">
        <ResumeBuilder />
      </div>
      <div className="w-1/2 p-4">
        <Preview about={""} jobs={[]} />
      </div>
    </div>
    <footer className="flex flex-row border border-gray-800 grow-0 justify-end items-center pr-4 py-4 gap-4">
      <button>
        <ExportIcon size="lg" />
      </button> 
      <button>
        <SaveIcon size="lg" />
      </button>
    </footer>
  </main>
);

export default App;
