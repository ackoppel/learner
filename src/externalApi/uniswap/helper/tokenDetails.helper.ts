import { IMarketMakerConnector } from '../../interface/marketMakerConnector.interface';
import { ConnectorTokenDetails } from '../../model/tokenDetails.connector';
import { IUniswapTokenDetails } from '../details/uniswapTokenDetails.interface';
import { BadRequestException } from '@nestjs/common';

export class UniswapTokenDetailsHelper {
  static async fetchTokenDetails(
    tokenAddress: string,
    apiConnector: IMarketMakerConnector,
  ): Promise<ConnectorTokenDetails> {
    const tokenData = (await apiConnector.fetchTokenDetails(
      tokenAddress,
    )) as IUniswapTokenDetails;

    if (!tokenData.token) {
      throw new BadRequestException(
        'Please check the provided contract address!',
      );
    }

    return apiConnector.convertTokenDetails(tokenData);
  }
}
