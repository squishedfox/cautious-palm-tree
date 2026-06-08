import {
  isAboutChangedAction,
  isAddExperienceAction,
  isAddJobAction,
  isJobDateChangedAction,
  isJobNameChangeAction,
  isRemoveExperienceAction,
  isRemoveJobAction,
  isUpdateExperienceAction,
  type ResumeBuilderActionType,
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

export const resumeBuilderReducer = (
  state = initialState,
  action: ResumeBuilderActionType,
) => {
  if (isAddJobAction(action)) {
    return addJobReducer(state);
  } else if (isRemoveJobAction(action)) {
    return removeJobReducer(state, action);
  } else if (isJobDateChangedAction(action)) {
    return jobDateChangedReducer(state, action);
  } else if (isJobNameChangeAction(action)) {
    return jobNameChangedReducer(state, action);
  } else if (isAddExperienceAction(action)) {
    return addExperienceReducer(state, action);
  } else if (isRemoveExperienceAction(action)) {
    return removeExperienceReducer(state, action);
  } else if (isUpdateExperienceAction(action)) {
    return updateExperienceReducer(state, action);
  } else if (isAboutChangedAction(action)) {
    return Object.assign({}, state, {
      about: action.payload.newAbout,
    });
  } else {
    return state;
  }
};
