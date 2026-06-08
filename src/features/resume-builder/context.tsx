import {
  createContext,
  useContext,
  useReducer,
  type PropsWithChildren,
} from "react";
import { type JobHistoryListItem } from "@app/types";
import {
  type DateRange,
  type ResumeBuilderFormValue,
} from "@app/features/resume-builder/types";
import { initialState, type ResumeBuilderState } from "./state";
import type { ResumeBuilderActionType } from "./actions";
import { resumeBuilderReducer } from "./reducers";

const ResumeBuilderContext = createContext({
  about: "",
  setAbout: (about: string) => {
    !!about;
    /* left intentially blank */
  },
  jobs: {} as Record<string, JobHistoryListItem>,
  addJob: () => {
    /* left intentially blank */
  },
  removeJob: (id: string) => {
    !!id;
    /* left intentially blank */
  },
  dateChanged: (id: string, range: DateRange) => {
    !!id;
    !!range;
    /* left intentially blank */
  },
  companyNameChanged: (id: string, newName: string) => {
    !!id;
    !!newName;
    /* left intentially blank */
  },
  addExperience: (jobId: string) => {
    !!jobId;
    /* left intentially blank */
  },
  removeExperience: (jobId: string, experienceId: string) => {
    !!jobId;
    !!experienceId;
    /* left intentially blank */
  },
  updateExperience: (jobId: string, experienceId: string, newValue: string) => {
    !!jobId;
    !!experienceId;
    !!newValue;
    /* left intentially blank */
  },
});

export interface ResumeBuilderFormProviderProps {
  onChange: (formValue: ResumeBuilderFormValue) => void;
}

export const ResumeBuilderFormProvider = ({
  onChange,
  children,
}: PropsWithChildren<ResumeBuilderFormProviderProps>) => {
  const [state, dispatch] = useReducer<
    ResumeBuilderState,
    [ResumeBuilderActionType]
  >(resumeBuilderReducer, initialState);

  const addJob = () => {
    dispatch({ type: "add-job" });
  };

  const removeJob = (id: string) => {
    dispatch({ type: "remove-job", payload: { id } });
  };

  const dateChanged = (id: string, range: DateRange) => {
    dispatch({
      type: "date-changed-job",
      payload: {
        jobId: id,
        range,
      },
    });
  };

  const companyNameChanged = (id: string, newName: string) => {
    dispatch({
      type: "name-changed-job",
      payload: {
        jobId: id,
        newName,
      },
    });
  };

  const addExperience = (jobId: string) => {
    dispatch({
      type: "add-experience",
      payload: {
        jobId,
      },
    });
  };

  const updateExperience = (
    jobId: string,
    experienceId: string,
    newValue: string,
  ) => {
    dispatch({
      type: "update-experience",
      payload: {
        expId: experienceId,
        jobId,
        newValue,
      },
    });
  };

  const removeExperience = (jobId: string, experienceId: string) => {
    dispatch({
      type: "remove-experience",
      payload: {
        jobId,
        expId: experienceId,
      },
    });
  };

  return (
    <ResumeBuilderContext.Provider
      value={{
        about: state.about,
        jobs: state.jobs,
        setAbout: (newAbout) =>
          dispatch({ type: "about-changed", payload: { newAbout } }),
        addJob,
        removeJob,
        dateChanged,
        companyNameChanged,
        addExperience,
        removeExperience,
        updateExperience,
      }}
    >
      {children}
    </ResumeBuilderContext.Provider>
  );
};

export const useResumseBuilderForm = () => useContext(ResumeBuilderContext);

export const useJob = (id: string) => {
  const {
    jobs,
    removeJob: removeCurrentJob,
    addExperience: addJobExperience,
    removeExperience: removeJobExperience,
    updateExperience: updateJobExperience,
    dateChanged: jobDateChanged,
    companyNameChanged: jobNameChanged,
  } = useResumseBuilderForm();

  const removeJob = () => removeCurrentJob(id);
  const addExperience = () => addJobExperience(id);
  const removeExperience = (experienceId: string) =>
    removeJobExperience(id, experienceId);
  const updateExperience = (experienceId: string, newText: string) =>
    updateJobExperience(id, experienceId, newText);
  const dateChanged = (range: DateRange) => jobDateChanged(id, range);
  const companyNameChanged = (newName: string) => jobNameChanged(id, newName);

  return {
    job: jobs[id],
    removeJob,
    addExperience,
    removeExperience,
    updateExperience,
    dateChanged,
    companyNameChanged,
  };
};
