import { InternalServerErrorException } from '@nestjs/common';
import { ConnectorCoinBalance } from '../../model/coinBalance.connector';
import { ICoinBalanceConnector } from '../../interface/coinBalanceConnector.interface';

export class EtherscanCoinBalanceHelper {
  static async fetchCoinBalance(
    userAddress: string,
    apiConnector: ICoinBalanceConnector,
  ): Promise<ConnectorCoinBalance> {
    const ethBalanceData = await apiConnector.fetchCoinBalance(userAddress);
    if (ethBalanceData.status !== '1') {
      throw new InternalServerErrorException(
        'Please check the provided address',
      );
    }
    return apiConnector.convertCoinBalance(userAddress, ethBalanceData);
  }
}
