import type { JobHistoryListItem } from "@app/types";

export interface ResumeBuilderState {
  about: string,
  jobs: Record<string, JobHistoryListItem>,
}
export const initialState: ResumeBuilderState = {
  about: "",
  jobs: {},
}
