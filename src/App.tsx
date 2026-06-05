import { ResumeBuilder } from "./features";

const App = () => (
  <main className="flex min-h-screen flex-row px-1">
    <div className="min-h-full flex-1/2 overflow-y-scroll border-r-2 border-r-gray-400">
      <ResumeBuilder />
    </div>
    <div className="ml-2 min-h-full flex-1/2 overflow-y-scroll">
      <h1>Preview Goes Here</h1>
    </div>
  </main>
);

export default App;
