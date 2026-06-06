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
    setJobs((prev) => {
      const copy = Object.assign({}, prev);
      copy[ulid()] = createEmptyJobHistoryItem();
      return copy;
    });
  };

  const removeJob = (id: string) => {
    setJobs((prev) => {
      const copy = Object.assign({}, prev);
      delete copy[id];
      return copy;
    });
  };

  const dateChanged = (id: string, range: DateRange) => {
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
    setJobs((prev) => {
      // faster than props spread
      const newValue = Object.assign({}, prev);
      newValue[id] = Object.assign({}, prev[id], { companyName: newName });
      return newValue;
    });
  };

  const addExperience = (jobId: string) => {
    setJobs((prev) => {
      // faster than props spread
      const newValue = Object.assign({}, prev);
      newValue[jobId] = Object.assign({}, prev[jobId], {
        experiences: {
          [ulid()]: "",
        },
      });
      return newValue;
    });
  };

  const removeExperience = (jobId: string, experienceId: string) => {
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
      }}
    >
      {children}
    </ResumeBuilderContext.Provider>
  );
};

export const useResumseBuilderForm = () => useContext(ResumeBuilderContext);
export const useJob = (id: string) => {
  const { jobs, removeJob: removeJob } = useResumseBuilderForm();

  const removeCurrentJob = () => {
    removeJob(id);
  };

  return {
    job: jobs[id],
    removeCurrentJob,
  };
};
