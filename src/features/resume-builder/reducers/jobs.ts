import { type JobHistoryListItem } from "@app/types";
import { ulid } from "ulid";
import {
  type JobDateChangedAction,
  type JobNameChangedAction,
  type RemoveJobAction,
} from "../actions";
import type { ResumeBuilderState } from "../state";

export const createEmptyJobHistoryItem = (): JobHistoryListItem => ({
  companyName: "Company Name Here",
  startDate: new Date().toLocaleDateString(),
  endDate: "",
  isCurrent: true,
  experience: {} as Record<string, string>,
});

export const addJobReducer = (prev: ResumeBuilderState) =>
  Object.assign({}, prev, {
    jobs: Object.assign({}, prev.jobs, {
      [ulid()]: createEmptyJobHistoryItem(),
    }),
  });

export const removeJobReducer = (
  prev: ResumeBuilderState,
  action: RemoveJobAction,
) =>
  Object.assign({}, prev, {
    jobs: Object.entries(prev.jobs).reduce(
      (acc, [id, job]) => {
        if (id !== action.payload.id) {
          acc[id] = Object.assign({}, job);
        }
        return acc;
      },
      {} as Record<string, JobHistoryListItem>,
    ),
  });

export const jobDateChangedReducer = (
  prev: ResumeBuilderState,
  action: JobDateChangedAction,
) =>
  Object.assign({}, prev, {
    jobs: Object.assign({}, prev.jobs, {
      [action.payload.jobId]: Object.assign(
        {},
        prev.jobs[action.payload.jobId],
        {
          startDate: action.payload.range[0],
          endDate: action.payload.range[1],
        },
      ),
    }),
  });

export const jobNameChangedReducer = (
  prev: ResumeBuilderState,
  action: JobNameChangedAction,
) =>
  Object.assign({}, prev, {
    jobs: Object.assign({}, prev.jobs, {
      [action.payload.jobId]: Object.assign(
        {},
        prev.jobs[action.payload.jobId],
        {
          companyName: action.payload.newName,
        },
      ),
    }),
  });
