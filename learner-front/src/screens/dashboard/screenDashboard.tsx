import React, { useContext } from "react";
import { AuthContext } from "../../components/auth/AuthContext";
import "./screenDashboard.css";
import { Frame } from "../../components/frame/frame";
import { AddressList } from "./addressList/addressList";
import { BalanceList } from "./balanceList/balanceList";

const ScreenDashboard: React.FC = () => {
  const { profile } = useContext(AuthContext);

  return (
    <Frame>
      <div className="dashboard">
        <AddressList />
        <BalanceList />
      </div>
    </Frame>
  );
};

export default ScreenDashboard;
