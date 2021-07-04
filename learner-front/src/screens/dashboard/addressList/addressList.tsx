import React from "react";
import "./addressList.css";
import { IAddress } from "../../../components/auth/AuthContext";
import { Address } from "../../../components/address/address";
import { Box } from "../../../components/box/box";

interface IProps {
  addresses?: IAddress[];
  onSelect: (address: IAddress) => void;
  onAddAddress?: () => void;
  selectedAddress?: string;
}

export const AddressList: React.FC<IProps> = ({
  addresses,
  onSelect,
  onAddAddress,
  selectedAddress,
}) => {
  return (
    <div className="address-list">
      <h3>Address List</h3>
      {addresses &&
        addresses.map((address, key) => (
          <Address
            address={address}
            onSelect={onSelect}
            key={key}
            isSelected={address.contractAddress === selectedAddress}
          />
        ))}
      <Box className="address-list-add" onClick={onAddAddress}>
        +
      </Box>
    </div>
  );
};
