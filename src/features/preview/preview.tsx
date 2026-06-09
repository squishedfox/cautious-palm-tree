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
    <div>
      <p>{about}</p>
      <ul>
        {jobs.map(({ companyName, endDate, startDate, experience }, ix) => (
          <li className="min-w-full">
            <div className="flex flex-col">
              <div className="flex content-between items-center gap-1">
                <h2>{companyName}</h2>
                <hr className="grow" />
                <div className="inline-flex">
                  <span>{startDate}</span> -{" "}
                  <span>{endDate ? endDate : "Current"}</span>
                </div>
              </div>
              <ul className="list-disc">
                {experience.map((exp, j) => (
                  <li key={j}>{exp}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Preview;
