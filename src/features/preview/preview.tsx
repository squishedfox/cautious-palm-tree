import {type JobHistoryListItem} from "@app/types";

export interface PreviewProps  {
  about: string;
  jobs: JobHistoryListItem[];
}

const Preview = ({about, jobs}: PreviewProps) => {
  return (<div className="flex grow w-full">
      <p>{about}</p>
      {jobs.map((job) => (<div className="space-y-1" role="row">
        <h3>{job.companyName}</h3>
        <p className="justify-between">{job.startDate}-{job.isCurrent ? "Current" : job.endDate}</p>
        <ul>
          {job.experience.map((exp, ix) => (<li key={ix}>{exp}</li>))}
        </ul>
      </div>))}
  </div>);
}

export default Preview;
