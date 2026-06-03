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
          <JobHistoryItem {...item} />
        </li>
      ))}
    </ul>
  );
};

export default HistoryList;
