import React from "react";
import "./formRow.css";

interface IProps {
  type: "password" | "text";
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  size: "large";
  required?: boolean;
}

export const FormRow: React.FC<IProps> = ({
  type,
  placeholder,
  value,
  onChange,
  size,
}) => {
  return (
    <input
      className={`form-row-${size}`}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={true}
    />
  );
};
