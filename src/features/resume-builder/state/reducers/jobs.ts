import { type JobHistoryListItem } from "@app/types";
import { ulid } from "ulid";
import { createEmptyJobHistoryItem } from "../utils";
import {
  type JobDateChangedAction,
  type JobNameChangedAction,
  type RemoveJobAction,
} from "../actions";

export const addJobReducer = (prev: Record<string, JobHistoryListItem>) =>
  Object.assign({}, prev, {
    [ulid()]: createEmptyJobHistoryItem(),
  });

export const removeJobReducer = (
  prev: Record<string, JobHistoryListItem>,
  action: RemoveJobAction,
) =>
  Object.entries(prev).reduce(
    (acc, [id, job]) => {
      if (id !== action.payload.id) {
        acc[id] = Object.assign({}, job);
      }
      return acc;
    },
    {} as Record<string, JobHistoryListItem>,
  );

export const jobDateChangedReducer = (
  prev: Record<string, JobHistoryListItem>,
  action: JobDateChangedAction,
) =>
  Object.assign({}, prev, {
    [action.payload.jobId]: Object.assign({}, prev[action.payload.jobId], {
      startDate: action.payload.range[0],
      endDate: action.payload.range[1],
    }),
  });

export const jobNameChangedReducer = (
  prev: Record<string, JobHistoryListItem>,
  action: JobNameChangedAction,
) =>
  Object.assign({}, prev, {
    [action.payload.jobId]: Object.assign({}, prev[action.payload.jobId], {
      companyName: action.payload.newName,
    }),
  });
