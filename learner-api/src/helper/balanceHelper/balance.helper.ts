import { TokenBalance } from '../../token/tokenBalance/entity/tokenBalance.entity';
import { Address } from '../../coin/address/entity/address.entity';

export class BalanceHelper {
  public static totalBalanceUsd(obj: Address): number {
    return (
      obj.tokenBalances.reduce((acc, balance: TokenBalance) => {
        acc += this.tokenBalanceUsd(
          balance.balance,
          balance.token.decimals,
          balance.token.priceInCoin,
          balance.token.coin.priceUsd,
        );
        return acc;
      }, 0) + this.ethBalanceUsd(obj)
    );
  }

  public static ethBalanceUsd(obj: Address) {
    return this.etherBalanceToUsd(
      obj.coinBalance,
      obj.coin.priceUsd,
      obj.coin.decimals,
    );
  }

  // todo :: maybe figure out a better way to deal with big supply tokens
  public static tokenPriceUsd(
    priceInCoin: string,
    coinPriceUsd: string,
  ): string {
    return (parseFloat(priceInCoin) * parseFloat(coinPriceUsd)).toFixed(20);
  }

  public static balanceWitDecimals(balance: string, decimals: number): number {
    return parseInt(balance) / 10 ** decimals;
  }

  public static tokenBalanceUsd(
    tokenBalance: string,
    tokenDecimals: number,
    priceInCoin: string,
    coinPriceUsd: string,
  ): number {
    return (
      this.balanceWitDecimals(tokenBalance, tokenDecimals) *
      parseFloat(this.tokenPriceUsd(priceInCoin, coinPriceUsd))
    );
  }

  private static etherBalanceToUsd(
    coinBalance: string,
    priceUsd: string,
    decimals: number,
  ): number {
    return (
      this.balanceWitDecimals(coinBalance, decimals) * parseFloat(priceUsd)
    );
  }
}
