import type { DateRange } from "../../types";

export type JobActionType =
  | "add-job"
  | "remove-job"
  | "update-job"
  | "date-changed-job"
  | "name-changed-job";

export interface JobAction {
  type: JobActionType;
}

export interface AddJobAction extends JobAction {
  type: "add-job";
}
export interface RemoveJobAction extends JobAction {
  type: "remove-job";
  payload: { id: string };
}
export interface JobDateChangedAction extends JobAction {
  type: "date-changed-job";
  payload: {
    jobId: string;
    range: DateRange;
  };
}
export interface JobNameChangedAction extends JobAction {
  type: "name-changed-job";
  payload: {
    jobId: string;
    newName: string;
  };
}

export type DispatchJobActionType =
  | AddJobAction
  | RemoveJobAction
  | JobDateChangedAction
  | JobNameChangedAction;

export const isAddJobAction = (action: JobAction): action is AddJobAction => {
  return action.type === "add-job";
};

export const isRemoveJobAction = (
  action: JobAction,
): action is RemoveJobAction => {
  return action.type === "remove-job";
};

export const isJobDateChangedAction = (
  action: JobAction,
): action is JobDateChangedAction => {
  return action.type === "date-changed-job";
};

export const isJobNameChangeAction = (
  action: JobAction,
): action is JobNameChangedAction => {
  return action.type === "name-changed-job";
};
