import type { JobHistoryListItem } from "@/types";
import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";
import { createEmptyJobHistoryItem } from "./utils";
import { ulid } from "ulid";
import { type DateRange, type ResumeBuilderFormValue } from "./types";

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
  const [about, setAbout] = useState<string>("");
  const [jobs, setJobs] = useState<Record<string, JobHistoryListItem>>({
    [ulid()]: createEmptyJobHistoryItem(),
  });

  const addJob = () => {
    console.debug("Adding Job");
    setJobs((prev) => {
      const copy = Object.assign({}, prev);
      copy[ulid()] = createEmptyJobHistoryItem();
      return copy;
    });
  };

  const removeJob = (id: string) => {
    console.debug("Removing Job: [", id, "]");
    setJobs((prev) => {
      const copy = Object.assign({}, prev);
      delete copy[id];
      return copy;
    });
  };

  const dateChanged = (id: string, range: DateRange) => {
    console.debug("Date changed for Job: [", id, "] new range", range);
    setJobs((prev) => {
      const newValue = Object.assign({}, prev);
      newValue[id] = Object.assign({}, prev[id], {
        startDate: range[0],
        endDate: range?.[1] || "",
      });
      return newValue;
    });
  };

  const companyNameChanged = (id: string, newName: string) => {
    console.debug("Company name changed for Job: [", id, "] new name", newName);
    setJobs((prev) => {
      // faster than props spread
      const newValue = Object.assign({}, prev);
      newValue[id] = Object.assign({}, prev[id], { companyName: newName });
      return newValue;
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
