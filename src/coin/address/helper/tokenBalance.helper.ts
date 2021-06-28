import { TokenBalance } from '../../../token/tokenBalance/entity/tokenBalance.entity';
import { TokenHelper } from '../../../helper/tokenHelper/tokenHelper';

export class TokenBalanceHelper {
  public static totalBalance(balances: TokenBalance[]): number {
    return balances.reduce((acc, balance: TokenBalance) => {
      acc += TokenHelper.convertBalanceToValueUsd(
        balance.balance,
        balance.token.decimals,
        balance.token.priceInCoin,
        balance.token.coin.priceUsd,
      );
      return acc;
    }, 0);
  }

  public static etherBalanceToUsd(
    coinBalance: string,
    priceUsd: string,
    decimals: number,
  ): number {
    console.log(
      (parseFloat(coinBalance) / 10 ** decimals) * parseFloat(priceUsd),
    );
    return (parseFloat(coinBalance) / 10 ** decimals) * parseFloat(priceUsd);
  }
}
