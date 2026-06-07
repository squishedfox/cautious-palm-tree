import type { JobHistoryListItem } from "@app/types";

export interface ResumeBuilderFormValue {
  about: string;
  jobHistory: JobHistoryListItem[];
}

export type DateRange = [string, string | undefined];
