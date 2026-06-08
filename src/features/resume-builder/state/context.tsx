import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
  type PropsWithChildren,
} from "react";
import { type JobHistoryListItem } from "@app/types";
import { createEmptyJobHistoryItem } from "./utils";
import { ulid } from "ulid";
import { type DateRange, type ResumeBuilderFormValue } from "@app/features/resume-builder/types";
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
  }
});

export interface ResumeBuilderFormProviderProps {
  onChange: (formValue: ResumeBuilderFormValue) => void;
}

export const ResumeBuilderFormProvider = ({
  onChange,
  children,
}: PropsWithChildren<ResumeBuilderFormProviderProps>) => {

  const [state, dispatch] = useReducer(resumeBuilderReducer, initialState)
  const [about, setAbout] = useState<string>("");
  const [jobs, setJobs] = useState<Record<string, JobHistoryListItem>>({
    [ulid()]: createEmptyJobHistoryItem(),
  });

  const addJob = () => {
    console.debug("Adding Job");
    dispatch({ type: "add-job", }); 
  };

  const removeJob = (id: string) => {
    console.debug("Removing Job: [", id, "]");
    dispatch({ type: "remove-job", payload: { id }});
  };

  const dateChanged = (id: string, range: DateRange) => {
    console.debug("Date changed for Job: [", id, "] new range", range);
    dispatch({ 
      type: "date-changed-job",
      payload: {
        jobId: id,
        range,
      }
    });
  };

  const companyNameChanged = (id: string, newName: string) => {
    console.debug("Company name changed for Job: [", id, "] new name", newName);
    dispatch({
      type: "name-changed-job",
      payload: {
        jobId: id,
        newName,
      },
    });
  };

  const addExperience = (jobId: string) => {
    console.debug("Adding experience for Job: [", jobId, "]");
    setJobs((prev) => {
      // faster than props spread
      const copy = Object.assign({}, prev, {
        [jobId]: Object.assign({}, prev[jobId], {
          experience: Object.assign({}, prev[jobId].experience, {
            [ulid()]: "",
          }),
        }),
      });

      return copy;
    });
  };

  const updateExperience = (jobId: string, experienceId: string, newValue: string) => {
    console.debug("Upating experience for Job: [", jobId, "]");
    setJobs((prev) => Object.assign({}, prev, {
      [jobId]: Object.assign({}, prev[jobId], {
        experience: Object.assign({}, prev[jobId].experience, {
          [experienceId]: newValue,
        }),
      }),
    }));
  }

  const removeExperience = (jobId: string, experienceId: string) => {
    console.debug("Removing experience for Job: [", jobId, "]");
    setJobs((prev) => {
      // faster than props spread
      const newValue = Object.assign({}, prev);
      delete newValue[jobId].experience[experienceId];
      return newValue;
    });
  };

  useEffect(() => {

  }, []);

  return (
    <ResumeBuilderContext.Provider
      value={{
        about,
        jobs,
        setAbout,
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
    companyNameChanged: jobNameChanged
  } = useResumseBuilderForm();

  const removeJob = () => removeCurrentJob(id);
  const addExperience = () => addJobExperience(id); 
  const removeExperience = (experienceId: string) => removeJobExperience(id, experienceId);
  const updateExperience = (experienceId: string, newText: string) => updateJobExperience(id, experienceId, newText);
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
