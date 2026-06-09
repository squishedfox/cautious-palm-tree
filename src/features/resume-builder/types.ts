export interface ResumeBuilderFormValue {
  about: string;
  jobHistory: {
    companyName: string;
    endDate?: string;
    startDate: string;
    experience: string[];
  }[];
}

export type DateRange = [string, string | undefined];
