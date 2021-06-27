export class TokenHelper {
  // todo :: maybe figure out a better way to deal with big supply tokens
  public static convertPrice(
    priceInCoin: string,
    coinPriceUsd: string,
  ): string {
    return (parseFloat(priceInCoin) * parseFloat(coinPriceUsd)).toFixed(20);
  }

  public static convertBalance(balance: string, decimals: number): number {
    return parseInt(balance) / 10 ** decimals;
  }

  public static convertBalanceToValueUsd(
    tokenBalance: string,
    tokenDecimals: number,
    priceInCoin: string,
    coinPriceUsd: string,
  ): number {
    return (
      this.convertBalance(tokenBalance, tokenDecimals) *
      parseFloat(this.convertPrice(priceInCoin, coinPriceUsd))
    );
  }
}
