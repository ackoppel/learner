import React from "react";
import "./addressList.css";
import { IAddress } from "../../../components/auth/AuthContext";
import { Address } from "../../../components/address/address";
import { Box } from "../../../components/box/box";
import { Overlay } from "../../../components/overlay/overlay";
import { AddAddress } from "./addAddress/addAddress";

interface IProps {
  addresses: IAddress[];
  onSelect: (address: IAddress) => void;
  onAddAddress: (contractAddress: string, chain: string) => void;
  selectedAddress?: string;
  overlayOpen: boolean;
  setOverlayOpen: (value: boolean) => void;
}

export const AddressList: React.FC<IProps> = ({
  addresses,
  onSelect,
  onAddAddress,
  selectedAddress,
  overlayOpen,
  setOverlayOpen,
}) => {
  return (
    <div className="address-list">
      <h3>Address List</h3>
      {addresses.length > 0 &&
        addresses.map((address, key) => (
          <Address
            address={address}
            onSelect={onSelect}
            key={key}
            isSelected={address.contractAddress === selectedAddress}
          />
        ))}
      <Box
        className="address-list-add"
        onClick={() => setOverlayOpen(!overlayOpen)}
      >
        +
      </Box>
      {overlayOpen && (
        <Overlay>
          <AddAddress
            onAddAddress={onAddAddress}
            onClose={() => setOverlayOpen(false)}
          />
        </Overlay>
      )}
    </div>
  );
};
