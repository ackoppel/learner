import React from "react";
import "./listRow.css";

interface IProps {
  value: string;
  label: string;
}

export const ListRow: React.FC<IProps> = ({ value, label }) => {
  return (
    <div className="list-row">
      <p>{value}</p>
      <span>{label}</span>
    </div>
  );
};
