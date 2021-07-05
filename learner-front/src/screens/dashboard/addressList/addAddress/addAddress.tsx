import React, { useState, useEffect } from "react";
import { FormRow } from "../../../../components/form/row/formRow";
import { FormButton } from "../../../../components/form/button/formButton";
import { FormSelect } from "../../../../components/form/select/formSelect";
import "./addAddress.css";
import { useFetchChains } from "./useFetchChains";

interface IProps {
  onAddAddress: (contractAddress: string, chain: string) => void;
  onClose: () => void;
}

interface IAddAddressValues {
  contractAddress: string;
  chain: string;
}

export const AddAddress: React.FC<IProps> = ({ onAddAddress, onClose }) => {
  // todo :: handle chains fetching error
  const { chains, fetchChains, hasError } = useFetchChains();
  const [values, setValues] = useState<IAddAddressValues>({
    contractAddress: "",
    chain: "",
  });

  useEffect(() => {
    fetchChains();
  }, []);

  return (
    <form
      className="add-address"
      onSubmit={(e) => {
        e.preventDefault();
        onAddAddress(values.contractAddress, values.chain);
      }}
    >
      <FormRow
        type="text"
        placeholder="Contract Address"
        value={values.contractAddress}
        onChange={(value) =>
          setValues((prev) => ({ ...prev, contractAddress: value }))
        }
        size="large"
      />
      <FormSelect
        options={chains}
        label="chain"
        onChange={(value) => setValues((prev) => ({ ...prev, chain: value }))}
      />
      <FormButton text="Add Address" type="submit" size="large" />
      <FormButton text="Cancel" type="button" size="large" onClick={onClose} />
    </form>
  );
};
