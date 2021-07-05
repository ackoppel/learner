import React, { useContext, useState } from "react";
import { AuthContext, IAddress } from "../../components/auth/AuthContext";
import { Frame } from "../../components/frame/frame";
import { AddressList } from "./addressList/addressList";
import { BalanceList } from "./balanceList/balanceList";
import "./screenDashboard.css";
import { useMessage } from "../../hooks/helper/useMessage";

const ScreenDashboard: React.FC = () => {
  const [selectedAddress, setSelectedAddress] = useState<IAddress | null>(null);
  const { profile, refreshProfile } = useContext(AuthContext);
  const { success, error } = useMessage();

  const onAddressSelect = (address: IAddress): void => {
    // todo :: add logic for handling screen size dependent actions
    setSelectedAddress(address);
  };

  const onAddAddress = async (
    contractAddress: string,
    chain: string
  ): Promise<void> => {};

  const onAddBalance = async (tokenAddress: string): Promise<void> => {};

  return (
    <Frame>
      <div className="dashboard">
        <AddressList
          addresses={profile?.addresses}
          onSelect={onAddressSelect}
          selectedAddress={selectedAddress?.contractAddress}
        />
        <BalanceList selectedBalances={selectedAddress?.tokenBalances} />
      </div>
    </Frame>
  );
};

export default ScreenDashboard;
