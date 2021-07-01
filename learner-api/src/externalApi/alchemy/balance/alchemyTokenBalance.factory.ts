import { IAlchemyTokenBalance } from './alchemyTokenBalance.interface';
import { ConnectorTokenBalance } from '../../model/tokenBalance.connector';

export class AlchemyTokenBalanceFactory {
  public static toConnectorTokenBalance(
    tokenBalance: IAlchemyTokenBalance,
    userAddress: string,
  ): ConnectorTokenBalance {
    const model = new ConnectorTokenBalance();
    const balance = tokenBalance.result.tokenBalances[0].tokenBalance;
    model.userAddress = userAddress;
    model.tokenAddress = tokenBalance.result.tokenBalances[0].contractAddress;
    model.balance = balance !== '0x' ? BigInt(balance).toString() : '0'; // token balance comes in as a hex string
    return model;
  }
}
