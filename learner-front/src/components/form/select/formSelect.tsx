import React from "react";
import "./formSelect.css";

interface IProps {
  options: string[];
  label: string;
  onChange: (value: string) => void;
}

export const FormSelect: React.FC<IProps> = ({ options, onChange, label }) => {
  return (
    <select
      onChange={(e) => onChange(e.target.value)}
      required={true}
      className="form-select"
    >
      <option value="">Select a {label.toLowerCase()}</option>
      {options.map((option, key) => (
        <option value={option} key={key}>
          {option.charAt(0).toUpperCase() + option.slice(1).toLowerCase()}
        </option>
      ))}
    </select>
  );
};
