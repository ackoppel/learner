import React from "react";
import { ListRow } from "../listRow/listRow";
import { ITokenBalance } from "../auth/AuthContext";
import "./balance.css";

interface IProps {
  balance: ITokenBalance;
  onDelete?: (balance: ITokenBalance) => void;
}

export const Balance: React.FC<IProps> = ({ balance }) => {
  return (
    <div className="balance">
      <div className="balance-info">
        <ListRow value={balance.name} label="Name" />
        <ListRow value={balance.symbol} label="Symbol" />
        <ListRow
          value={`$${parseFloat(balance.priceUsd).toFixed(5)}`}
          label="Price"
        />
        <ListRow
          value={Math.round(balance.balanceConverted).toString()}
          label="Balance"
        />
        <ListRow
          value={`$${Math.round(balance.balanceValueUsd)}`}
          label="Balance Value"
        />
      </div>
      <div className="balance-token-logo">
        <img src={balance.logoUrl} alt="Token Logo" />
      </div>
    </div>
  );
};
