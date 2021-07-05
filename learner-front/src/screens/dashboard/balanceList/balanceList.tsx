import React, { useState } from "react";
import "./balanceList.css";
import { ITokenBalance } from "../../../components/auth/AuthContext";
import { Box } from "../../../components/box/box";
import { Balance } from "../../../components/balance/balance";
import { Overlay } from "../../../components/overlay/overlay";
import { AddBalance } from "./addBalance/addBalance";

interface IProps {
  selectedBalances?: ITokenBalance[] | null;
  onAddBalance?: () => void;
}

export const BalanceList: React.FC<IProps> = ({
  selectedBalances,
  onAddBalance,
}) => {
  const [overlayOpen, setOverlayOpen] = useState<boolean>(false);

  const onAdd = (tokenAddress: string) => {
    console.log("TOKEN ADDRESS:: ", tokenAddress);
  };

  return (
    <div className="balance-list">
      <h3>Token Balances</h3>
      {!selectedBalances && (
        <Box className="balance-list-select">Select an address</Box>
      )}
      {selectedBalances &&
        selectedBalances.map((balance, key) => (
          <Balance balance={balance} key={key} />
        ))}
      {selectedBalances && (
        <Box
          className="balance-list-add"
          onClick={() => setOverlayOpen(!overlayOpen)}
        >
          +
        </Box>
      )}
      {overlayOpen && (
        <Overlay>
          <AddBalance
            onAddBalance={onAdd}
            onClose={() => setOverlayOpen(false)}
          />
        </Overlay>
      )}
    </div>
  );
};
