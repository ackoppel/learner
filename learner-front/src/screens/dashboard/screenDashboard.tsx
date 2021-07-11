import React, { useContext, useState } from "react";
import { AuthContext, IAddress } from "../../components/auth/AuthContext";
import { Frame } from "../../components/frame/frame";
import { AddressList } from "./addressList/addressList";
import { BalanceList } from "./balanceList/balanceList";
import { usePostAddress } from "./usePostAddress";
import { usePostBalance } from "./usePostBalance";
import "./screenDashboard.css";

const ScreenDashboard: React.FC = () => {
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

  const onAddressSelect = (address: IAddress): void => {
    // todo :: add logic for handling screen size dependent actions
    setSelectedAddress(address);
  };

  const onAddAddress = async (
    contractAddress: string,
    chain: string
  ): Promise<void> => {
    await postAddress(contractAddress, chain);
    if (hasErrorAddress) {
      return;
    }
    await refreshProfile();
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
    await refreshProfile();
    // console.log("dashboard");
    // todo :: fix showing the new balance instantly after post request
    // const updatedAddress = addresses.find(
    //   (item) => item.contractAddress === selectedAddress.contractAddress
    // );
    // if (updatedAddress) setSelectedAddress(updatedAddress);
    // console.log(updatedAddress);
    setBalOverlayOpen(false);
  };

  return (
    <Frame>
      <div className="dashboard">
        <AddressList
          addresses={addresses}
          onSelect={onAddressSelect}
          selectedAddress={selectedAddress?.contractAddress}
          onAddAddress={onAddAddress}
          overlayOpen={adrOverlayOpen}
          setOverlayOpen={setAdrOverlayOpen}
        />
        <BalanceList
          selectedBalances={selectedAddress?.tokenBalances}
          overlayOpen={balOverlayOpen}
          setOverlayOpen={setBalOverlayOpen}
          onAddBalance={onAddBalance}
        />
      </div>
    </Frame>
  );
};

export default ScreenDashboard;
