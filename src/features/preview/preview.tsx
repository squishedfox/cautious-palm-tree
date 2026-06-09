export interface PreviewProps {
  about: string;
  jobs: {
    startDate: string;
    endDate?: string;
    companyName: string;
    experience: string[];
  }[];
}

const Preview = ({ about, jobs }: PreviewProps) => {
  return (
    <div className="flex w-full grow">
      <p>{about}</p>
      {jobs.map(({ companyName, endDate, startDate, experience }) => (
        <div className="space-y-1" role="row">
          <h3>{companyName}</h3>
          <p className="justify-between">
            {startDate}-{endDate ? endDate : "Current"}
          </p>
          <ul>
            {experience.map((exp, ix) => (
              <li key={ix}>{exp}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Preview;
