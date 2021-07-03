import React from "react";
import { Header } from "../header/header";
import classNames from "classnames";
import "./frameMain.css";

interface IProps {
  className?: string;
}

export const Frame: React.FC<IProps> = ({ children, className }) => {
  return (
    <div className={classNames("frame", className)}>
      <Header />
      {children}
    </div>
  );
};
