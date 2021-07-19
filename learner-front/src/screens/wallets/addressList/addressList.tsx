import React, { useState } from "react";
import "./addressList.css";
import { IAddress } from "../../../components/auth/AuthContext";
import { Address } from "../../../components/address/address";
import { Box } from "../../../components/box/box";
import { Overlay } from "../../../components/overlay/overlay";
import { AddAddress } from "./addAddress/addAddress";
import { ActionBox } from "../../../components/actionBox/actionBox";
import { ChainType } from "../../../core/chain";

interface IProps {
  addresses: IAddress[];
  onSelect: (address: IAddress) => void;
  onAddAddress: (contractAddress: string, chain: ChainType) => void;
  onRemoveAddress: (contractAddress: string, chain: ChainType) => void;
  selectedAddress?: string;
  overlayOpen: boolean;
  setOverlayOpen: (value: boolean) => void;
}

export const AddressList: React.FC<IProps> = ({
  addresses,
  onSelect,
  onAddAddress,
  onRemoveAddress,
  selectedAddress,
  overlayOpen,
  setOverlayOpen,
}) => {
  const [confirmOverlayOpen, setConfirmOverlayOpen] = useState<boolean>(false);
  // todo :: implement onDetailView and onDelete functionality
  return (
    <div className="address-list">
      <h3>Address List</h3>
      {addresses.length > 0 &&
        addresses.map((address, key) => (
          <div key={key} className="address-wrapper">
            <Address
              address={address}
              onSelect={onSelect}
              key={key}
              isSelected={address.contractAddress === selectedAddress}
            />
            <ActionBox
              onDetailView={() =>
                console.log(
                  "VIEW CONTRACT ADDRESS ::: ",
                  address.contractAddress
                )
              }
              isVisible={address.contractAddress === selectedAddress}
              onDelete={() => {
                // todo :: open confirmation overlay
                onRemoveAddress(address.contractAddress, address.coinName);
              }}
            />
          </div>
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
      {confirmOverlayOpen && <Overlay></Overlay>}
    </div>
  );
};
