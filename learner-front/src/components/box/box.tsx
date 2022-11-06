import React from "react";
import "./box.css";

interface IProps {
  className: string;
  onClick?: () => void;
}

export const Box: React.FC<IProps> = ({ children, className, onClick }) => {
  return (
    <div className={className} onClick={onClick}>
      <div className="box">{children}</div>
    </div>
  );
};
