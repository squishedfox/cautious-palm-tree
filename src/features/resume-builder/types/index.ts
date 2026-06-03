export interface JobHistoryListItem {
  /**
   * Full name of the company
   * @example Hello World Inc.
   * @example Major Busines LLC.
   */
  companyName: string;
  /**
   * Month and year started
   */
  startDate: string;
  /**
   * end month and year
   */
  endDate?: string;
  /**
   * Whether the job is currently your job
   */
  isCurrent: boolean;
}

export interface JobHistoryList {
  /**
   * All of your job history
   */
  items: JobHistoryListItem[];
}
