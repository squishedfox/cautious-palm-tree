import { useId } from "react";

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
    <div className="space-y-4">
      <div>
        <h3>
          <strong>About Me</strong>
        </h3>
        <p>{about}</p>
        <hr />
      </div>
      <ul>
        {jobs.map(({ companyName, endDate, startDate, experience }, ix) => {
          const id = useId();
          return (
            <li className="min-w-full" aria-labelledby={id}>
              <div className="flex content-between items-center gap-1">
                <h2 id={id}>
                  <strong>{companyName}</strong>
                </h2>
                <hr className="grow" />
                <div className="inline-flex">
                  <span>{startDate}</span> -{" "}
                  <span>{endDate ? endDate : "Current"}</span>
                </div>
              </div>
              <ul className="ml-6 list-disc">
                {experience
                  .filter((exp) => !!exp)
                  .map((exp, j) => (
                    <li key={j}>{exp}</li>
                  ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Preview;
