import React, { useContext, useState } from "react";
import { AuthContext, IAddress } from "../../components/auth/AuthContext";
import { Frame } from "../../components/frame/frame";
import { AddressList } from "./addressList/addressList";
import { BalanceList } from "./balanceList/balanceList";
import { usePostAddress } from "./usePostAddress";
import { usePostBalance } from "./usePostBalance";
import "./screenWallets.css";
import { ChainType } from "../../core/chain";
import { useDeleteAddress } from "./useDeleteAddress";
import { useDeleteBalance } from "./useDeleteBalance";

const ScreenWallets: React.FC = () => {
  const [adrOverlayOpen, setAdrOverlayOpen] = useState<boolean>(false);
  const [balOverlayOpen, setBalOverlayOpen] = useState<boolean>(false);
  const [selectedAddress, setSelectedAddress] = useState<IAddress | null>(null);
  const { addresses, refreshProfile } = useContext(AuthContext);
  const {
    isLoading: isLoadingAddress,
    hasError: hasErrorAddress,
    postAddress,
  } = usePostAddress();
  const {
    isLoading: isLoadingBalance,
    hasError: hasErrorBalance,
    postBalance,
  } = usePostBalance();
  const {
    isLoading: isLoadingDeleteAddress,
    hasError: hasErrorDeleteAddress,
    deleteAddress,
  } = useDeleteAddress();

  const {
    isLoading: isLoadingDeleteBalance,
    hasError: hasErrorDeleteBalance,
    deleteBalance,
  } = useDeleteBalance();

  const onAddressSelect = (address: IAddress): void => {
    // todo :: add logic for handling screen size dependent actions
    if (selectedAddress !== address) {
      setSelectedAddress(address);
    } else {
      setSelectedAddress(null);
    }
  };

  const onAddAddress = async (
    contractAddress: string,
    chain: ChainType
  ): Promise<void> => {
    await postAddress(contractAddress, chain);
    if (hasErrorAddress) {
      return;
    }
    refreshProfile();
    setAdrOverlayOpen(false);
  };

  const onAddBalance = async (tokenAddress: string): Promise<void> => {
    if (!selectedAddress) {
      return;
    }
    await postBalance(
      tokenAddress,
      selectedAddress.contractAddress,
      selectedAddress.coinName
    );
    if (hasErrorBalance) {
      return;
    }
    refreshProfile();
    // todo :: fix showing the new balance instantly after post request
    setBalOverlayOpen(false);
  };

  const onRemoveAddress = async (): Promise<void> => {
    if (!selectedAddress) return;
    await deleteAddress(
      selectedAddress.contractAddress,
      selectedAddress.coinName
    );
    refreshProfile();
  };

  const onRemoveBalance = async (tokenAddress: string): Promise<void> => {
    if (!selectedAddress) return;
    await deleteBalance(
      selectedAddress.contractAddress,
      tokenAddress,
      selectedAddress.coinName
    );
    // todo :: check removing address from view after successful delete
    refreshProfile();
  };

  return (
    <Frame>
      <div className="wallet">
        <AddressList
          addresses={addresses}
          onSelect={onAddressSelect}
          selectedAddress={selectedAddress?.contractAddress}
          onAddAddress={onAddAddress}
          onRemoveAddress={onRemoveAddress}
          overlayOpen={adrOverlayOpen}
          setOverlayOpen={setAdrOverlayOpen}
        />
        <BalanceList
          selectedBalances={selectedAddress?.tokenBalances}
          onAddBalance={onAddBalance}
          onRemoveBalance={onRemoveBalance}
          overlayOpen={balOverlayOpen}
          setOverlayOpen={setBalOverlayOpen}
        />
      </div>
    </Frame>
  );
};

export default ScreenWallets;
