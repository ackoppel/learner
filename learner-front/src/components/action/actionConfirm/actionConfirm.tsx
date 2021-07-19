import React from "react";
import "./actionConfirm.css";

interface IProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export const ActionConfirm: React.FC<IProps> = ({
  children,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="action-box-confirm">
      {children}
      <div className="action-box-buttons">
        <div onClick={onConfirm}>
          <p>Yes</p>
        </div>
        <div onClick={onCancel}>
          <p>No</p>
        </div>
      </div>
    </div>
  );
};
