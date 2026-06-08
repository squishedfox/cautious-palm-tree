import {
  isAddExperienceAction,
  isAddJobAction,
  isJobDateChangedAction,
  isJobNameChangeAction,
  isRemoveExperienceAction,
  isRemoveJobAction,
  isUpdateExperienceAction,
  type AddJobAction,
  type DispatchJobActionType,
} from "../actions";
import { initialState } from "../state";
import {
  addExperienceReducer,
  removeExperienceReducer,
  updateExperienceReducer,
} from "./experience";
import {
  addJobReducer,
  jobDateChangedReducer,
  jobNameChangedReducer,
  removeJobReducer,
} from "./jobs";

export type ResumeBuilderAction = AddJobAction;
export const resumeBuilderReducer = (
  state = initialState,
  action: DispatchJobActionType,
) => {
  if (isAddJobAction(action)) {
    return addJobReducer(state.jobs);
  } else if (isRemoveJobAction(action)) {
    return removeJobReducer(state.jobs, action);
  } else if (isJobDateChangedAction(action)) {
    return Object.assign(
      {},
      state.jobs,
      jobDateChangedReducer(state.jobs, action),
    );
  } else if (isJobNameChangeAction(action)) {
    return Object.assign(
      {},
      state.jobs,
      jobNameChangedReducer(state.jobs, action),
    );
  } else if (isAddExperienceAction(action)) {
    return addExperienceReducer(state, action);
  } else if (isRemoveExperienceAction(action)) {
    return removeExperienceReducer(state, action);
  } else if (isUpdateExperienceAction(action)) {
    return updateExperienceReducer(state, action);
  } else {
    return state;
  }
};
