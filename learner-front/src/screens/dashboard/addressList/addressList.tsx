import React, { useState } from "react";
import "./addressList.css";
import { IAddress } from "../../../components/auth/AuthContext";
import { Address } from "../../../components/address/address";
import { Box } from "../../../components/box/box";
import { Overlay } from "../../../components/overlay/overlay";
import { AddAddress } from "./addAddress/addAddress";

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
  const [overlayOpen, setOverlayOpen] = useState<boolean>(false);

  const onAdd = (contractAddress: string, chain: string) => {
    console.log("CONTRACT ADDRESS:: ", contractAddress);
    console.log("CHAIN:: ", chain);
  };

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
      <Box
        className="address-list-add"
        onClick={() => setOverlayOpen(!overlayOpen)}
      >
        +
      </Box>
      {overlayOpen && (
        <Overlay>
          <AddAddress
            onAddAddress={onAdd}
            onClose={() => setOverlayOpen(false)}
          />
        </Overlay>
      )}
    </div>
  );
};
