import React, { useContext, useState } from "react";
import { AuthContext, IAddress } from "../../components/auth/AuthContext";
import { Frame } from "../../components/frame/frame";
import { AddressList } from "./addressList/addressList";
import { BalanceList } from "./balanceList/balanceList";
import "./screenDashboard.css";

const ScreenDashboard: React.FC = () => {
  const [selectedAddress, setSelectedAddress] = useState<IAddress | null>(null);
  const { profile } = useContext(AuthContext);

  const onAddressSelect = (address: IAddress): void => {
    // todo :: add logic for handling screen size dependent actions
    setSelectedAddress(address);
  };

  const onAddressDeSelect = () => {
    setSelectedAddress(null);
  };

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
