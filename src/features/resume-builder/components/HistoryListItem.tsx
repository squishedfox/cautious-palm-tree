export interface JobHistoryItemProps {
  companyName: string;
  startDate: string;
  endDate?: string;
}

const JobHistoryItem = ({
  companyName,
  startDate,
  endDate,
}: JobHistoryItemProps) => {
  return (
    <div>
      <div className="flex" role="group">
        <label>{companyName}</label>
        <div className="flex">
          <strong>{startDate}</strong> -{" "}
          {Boolean(endDate) ? endDate : "Current"}
        </div>
      </div>
    </div>
  );
};

export default JobHistoryItem;
