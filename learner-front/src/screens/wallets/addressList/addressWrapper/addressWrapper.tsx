import React, { useState } from "react";
import { ActionBox } from "../../../../components/action/actionBox/actionBox";

interface IProps {
  contractAddress: string;
  onDelete: () => void;
}

export const AddressWrapper: React.FC<IProps> = ({
  children,
  onDelete,
  contractAddress,
}) => {
  const [actionsVisible, setActionsVisible] = useState<boolean>(false);

  return (
    <div
      className="address-wrapper"
      onMouseOver={() => setActionsVisible(true)}
      onMouseLeave={() => setActionsVisible(false)}
    >
      {children}
      <ActionBox
        onDetailView={() =>
          console.log("VIEW CONTRACT ADDRESS ::: ", contractAddress)
        }
        isVisible={actionsVisible}
        onDelete={onDelete}
      />
    </div>
  );
};
