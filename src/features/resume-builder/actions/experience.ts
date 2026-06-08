export type ExperienceActionName =
  | "add-experience"
  | "remove-experience"
  | "update-experience";

export interface ExperienceActionType {
  type: ExperienceActionName;
}
export interface AddExperienceAction extends ExperienceActionType {
  type: "add-experience";
  payload: {
    jobId: string;
  };
}

export interface RemoveExperienceAction extends ExperienceActionType {
  type: "remove-experience";
  payload: {
    jobId: string;
    expId: string;
  };
}

export interface UpdateExperienceAction extends ExperienceActionType {
  type: "update-experience";
  payload: {
    jobId: string;
    expId: string;
    newValue: string;
  };
}

export type DispatchExperienceActionType =
  | AddExperienceAction
  | RemoveExperienceAction
  | UpdateExperienceAction;

export const isAddExperienceAction = (action: {
  type: string;
}): action is AddExperienceAction => {
  return action.type === "add-experience";
};
export const isRemoveExperienceAction = (action: {
  type: string;
}): action is RemoveExperienceAction => {
  return action.type === "remove-experience";
};
export const isUpdateExperienceAction = (action: {
  type: string;
}): action is UpdateExperienceAction => {
  return action.type === "update-experience";
};
