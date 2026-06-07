import type { JobHistoryListItem } from "@app/types";

export interface ResumeBuilderFormValue {
  about: string;
  jobHistoryItems: JobHistoryListItem[];
}

export type DateRange = [string, string | undefined];
