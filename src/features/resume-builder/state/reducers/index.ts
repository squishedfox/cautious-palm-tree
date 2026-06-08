import { isAddJobAction, isJobDateChangedAction, isJobNameChangeAction, isRemoveJobAction, type AddJobAction, type DispatchJobActionType } from "../actions";
import { initialState } from "../state";
import { addJobReducer, jobDateChangedReducer, jobNameChangedReducer, removeJobReducer } from "./jobs";

export type ResumeBuilderAction = AddJobAction
export const resumeBuilderReducer = (state = initialState, action: DispatchJobActionType) => {
  if (isAddJobAction(action)) {
    return addJobReducer(state.jobs);
  } else if (isRemoveJobAction(action)) {
    return removeJobReducer(state.jobs, action);
  } else if (isJobDateChangedAction(action)) {
    return Object.assign({}, state.jobs, jobDateChangedReducer(state.jobs, action));
  } else if (isJobNameChangeAction(action)) {
    return Object.assign({}, state.jobs, jobNameChangedReducer(state.jobs, action));
  }
  return state;
}
