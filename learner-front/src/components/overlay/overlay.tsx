import React from "react";
import "./overlay.css";

export const Overlay: React.FC = ({ children }) => {
  return <div className="overlay">{children}</div>;
};
