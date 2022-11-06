import React from "react";
import { IAddress } from "../auth/AuthContext";
import { ListRow } from "../listRow/listRow";
import "./address.css";
import classNames from "classnames";

interface IProps {
  address: IAddress;
  onSelect: (address: IAddress) => void;
  isSelected: boolean;
}

export const Address: React.FC<IProps> = ({
  address,
  onSelect,
  isSelected,
}) => {
  return (
    <div
      className={classNames("address", isSelected && "selected")}
      onClick={() => onSelect(address)}
    >
      <div className="address-info">
        <ListRow
          value={`${address.contractAddress.slice(
            0,
            4
          )}...${address.contractAddress.slice(
            address.contractAddress.length - 4,
            address.contractAddress.length
          )}`}
          label="Address"
        />
        <ListRow
          value={
            address.coinName.charAt(0).toUpperCase() +
            address.coinName.slice(1).toLowerCase()
          }
          label="Chain"
        />
        {/*<ListRow*/}
        {/*  value={`$${Math.floor(address.coinPriceUsd)}`}*/}
        {/*  label="Coin Price"*/}
        {/*/>*/}
        <ListRow
          value={`${address.coinBalance.toFixed(5)}...`}
          label="Coin Balance"
        />
        <ListRow
          value={address.tokenBalances.length.toString()}
          label="Tokens"
        />
        <ListRow
          value={`$${Math.floor(address.totalBalanceUsd)}`}
          label="Total Balance Value"
        />
      </div>
      {/* todo :: add coin logo to database */}
      <div className="address-coin-logo">
        <img src="https://i.imgur.com/RTyj5eL.png" alt="Coin logo" />
      </div>
    </div>
  );
};
