import React from "react";
import "./actionBox.css";

interface IProps {
  onDetailView?: () => void;
  onDelete: () => void;
  isVisible: boolean;
}

export const ActionBox: React.FC<IProps> = ({
  onDetailView,
  isVisible,
  onDelete,
}) => {
  if (!isVisible) return null;
  return (
    <div className="action-box">
      {onDetailView && (
        <div className="action-box-action">
          <p onClick={onDetailView}>Details</p>
        </div>
      )}
      <div className="action-box-action">
        <p onClick={onDelete}>Remove</p>
      </div>
    </div>
  );
};
