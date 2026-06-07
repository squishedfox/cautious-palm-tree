import { type JobHistoryListItem } from "@app/types";

export const createEmptyJobHistoryItem = (): JobHistoryListItem => ({
  companyName: "Company Name Here",
  startDate: new Date().toLocaleDateString(),
  endDate: "",
  isCurrent: true,
  experience: [],
});
