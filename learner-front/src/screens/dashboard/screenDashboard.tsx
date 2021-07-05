import React, { useContext, useState } from "react";
import { AuthContext, IAddress } from "../../components/auth/AuthContext";
import { Frame } from "../../components/frame/frame";
import { AddressList } from "./addressList/addressList";
import { BalanceList } from "./balanceList/balanceList";
import { usePostAddress } from "./usePostAddress";
import "./screenDashboard.css";

const ScreenDashboard: React.FC = () => {
  const [selectedAddress, setSelectedAddress] = useState<IAddress | null>(null);
  const { profile, refreshProfile } = useContext(AuthContext);
  const { isLoading, hasError, postAddress } = usePostAddress();

  const onAddressSelect = (address: IAddress): void => {
    // todo :: add logic for handling screen size dependent actions
    setSelectedAddress(address);
  };

  const onAddAddress = async (
    contractAddress: string,
    chain: string
  ): Promise<void> => {
    await postAddress(contractAddress, chain);
    if (hasError) {
      return;
    }
    await refreshProfile();
  };

  const onAddBalance = async (tokenAddress: string): Promise<void> => {};

  return (
    <Frame>
      <div className="dashboard">
        <AddressList
          addresses={profile?.addresses}
          onSelect={onAddressSelect}
          selectedAddress={selectedAddress?.contractAddress}
          onAddAddress={onAddAddress}
        />
        <BalanceList selectedBalances={selectedAddress?.tokenBalances} />
      </div>
    </Frame>
  );
};

export default ScreenDashboard;
