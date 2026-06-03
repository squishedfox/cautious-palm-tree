import { useState } from "react";
import type { JobHistoryList } from "../types";
import JobHistoryItem from "./HistoryListItem";

const HistoryList = () => {
  const [jobHistory, _] = useState<JobHistoryList>({ items: [] });

  return (
    <ul>
      <h1></h1>
      {jobHistory.items.map((item) => (
        <li key={item.companyName}>
          <div>
            <div className="flex content-between">
              <div>
                <span>Up Arrow Chvron here</span>
                <span>Down Arrow Chvron here</span>
              </div>
              <div>
                <button>Trash Button Here</button>
              </div>
            </div>
            <JobHistoryItem {...item} />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default HistoryList;
