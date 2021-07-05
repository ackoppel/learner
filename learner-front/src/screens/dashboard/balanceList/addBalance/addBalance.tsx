import React, { useState } from "react";
import { FormRow } from "../../../../components/form/row/formRow";
import { FormButton } from "../../../../components/form/button/formButton";
import "./addBalance.css";

interface IProps {
  onAddBalance: (tokenAddress: string) => void;
  onClose: () => void;
}

export const AddBalance: React.FC<IProps> = ({ onAddBalance, onClose }) => {
  const [tokenAddress, setTokenAddress] = useState("");

  return (
    <form
      className="add-balance"
      onSubmit={(e) => {
        e.preventDefault();
        onAddBalance(tokenAddress);
      }}
    >
      <FormRow
        type="text"
        placeholder="Token Address"
        value={tokenAddress}
        onChange={(value) => setTokenAddress(value)}
        size="large"
      />
      <FormButton text="Add Token Balance" type="submit" size="large" />
      <FormButton text="Cancel" type="button" size="large" onClick={onClose} />
    </form>
  );
};
