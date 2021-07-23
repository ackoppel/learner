import React, { useState } from "react";
import "./addressList.css";
import { IAddress } from "../../../components/auth/AuthContext";
import { Address } from "../../../components/address/address";
import { Box } from "../../../components/box/box";
import { Overlay } from "../../../components/overlay/overlay";
import { AddAddress } from "./addAddress/addAddress";
import { ActionBox } from "../../../components/action/actionBox/actionBox";
import { ChainType } from "../../../core/chain";
import { ActionConfirm } from "../../../components/action/actionConfirm/actionConfirm";
import { AddressWrapper } from "./addressWrapper/addressWrapper";

interface IProps {
  addresses: IAddress[];
  onSelect: (address: IAddress) => void;
  onAddAddress: (contractAddress: string, chain: ChainType) => void;
  onRemoveAddress: () => void;
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
  const [showActionBox, setShowActionBox] = useState<boolean>(false);
  const [confirmOverlayOpen, setConfirmOverlayOpen] = useState<boolean>(false);
  // todo :: implement onDetailView functionality

  return (
    <div className="address-list">
      <h3>Address List</h3>
      {addresses.length > 0 &&
        addresses.map((address, key) => (
          <AddressWrapper
            contractAddress={address.contractAddress}
            onDelete={() => setConfirmOverlayOpen(true)}
          >
            <Address
              address={address}
              onSelect={onSelect}
              key={key}
              isSelected={address.contractAddress === selectedAddress}
            />
          </AddressWrapper>
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
      {confirmOverlayOpen && (
        <Overlay>
          <ActionConfirm
            onConfirm={onRemoveAddress}
            onCancel={() => setConfirmOverlayOpen(false)}
          >
            Are you sure you want to remove this address?
          </ActionConfirm>
        </Overlay>
      )}
    </div>
  );
};
