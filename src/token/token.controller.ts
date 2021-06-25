import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
// todo :: remove
import { Connector } from '../externalApi/alchemy/connector';
import { Connector as UniswapConnector } from '../externalApi/uniswap/connector';
import { UniswapTokenDetailsFactory } from '../externalApi/uniswap/details/uniswapTokenDetails.factory';
import { UniswapPriceFactory } from '../externalApi/uniswap/price/uniswapPrice.factory';
import { IUniswapTokenDetails } from '../externalApi/uniswap/details/uniswapTokenDetails.interface';
import { AlchemyTokenLogoFactory } from '../externalApi/alchemy/logo/alchemyTokenLogo.factory';
import { IAlchemyTokenLogo } from '../externalApi/alchemy/logo/alchemyTokenLogo.interface';
import { AlchemyTokenBalanceFactory } from '../externalApi/alchemy/balance/alchemyTokenBalance.factory';
import { TokenService } from './token.service';
import { JwtGuard } from '../auth/jwtGuard';
import { CreateTokenDto } from './dto/createToken.dto';

@Controller('token')
export class TokenController {
  constructor(private tokenService: TokenService) {}

  @Post('uniswap')
  @UseGuards(JwtGuard)
  async createUniswapToken(@Body() createTokenDto: CreateTokenDto) {}

  // todo :: remove
  @Get('test')
  async test() {
    // ALCHEMY
    const apiConnector = new Connector(
      'RYRYJzV7TPF4S1X5H-ajkdRo_Zst6nl3',
      '0xa5f43c6710ff9243a42e64717f7c7b0beee4c29b',
    );
    // a: 0xb581e3a7db80fbaa821ab39342e9cbfd2ce33c23
    // b: 0x8d3e855f3f55109d473735ab76f753218400fe96
    const info = await apiConnector.fetchTokenLogo(
      '0x5218E472cFCFE0b64A064F055B43b4cdC9EfD3A6',
    );
    console.log('TOKEN INFO:', info);
    const tokenLogo = AlchemyTokenLogoFactory.toConnectorTokenLogo(
      info as IAlchemyTokenLogo,
      '0x5218E472cFCFE0b64A064F055B43b4cdC9EfD3A6',
    );
    console.log('TOKEN LOGO CONNECTOR: ', tokenLogo);

    const tokenBalance = await apiConnector.fetchTokenBalance(
      '0x5218E472cFCFE0b64A064F055B43b4cdC9EfD3A6',
    );
    console.log('TOKEN BALANCE RESULT: ', tokenBalance);
    console.log('TOKEN BALANCE: ', tokenBalance.result.tokenBalances);
    const parsedBalance = BigInt(
      tokenBalance.result.tokenBalances[0].tokenBalance,
    ).toString();
    console.log(
      'TOKEN BALANCE CONNECTOR: ',
      // parseInt(tokenBalance.result.tokenBalances[0].tokenBalance),
      apiConnector.convertTokenBalance(tokenBalance),
    );
    // console.log(
    //   'TOKEN BALANCE NORMALIZED: ',
    //   parseInt(parsedBalance) / 10 ** 18,
    // );

    // UNISWAP
    const connector = new UniswapConnector();
    const result = await connector.fetchEthPriceInUsd();
    const ethPrice = UniswapPriceFactory.toConnectorCoinPrice(result);
    console.log('ETH PRICE CONNECTOR: ', ethPrice);
    console.log('ETH PRICE PARSED', parseFloat(ethPrice.priceUsd));

    // uniswap: 0x8d3e855f3f55109d473735ab76f753218400fe96
    // etherSc: 0x8D3E855f3f55109D473735aB76F753218400fe96
    const result2 = await connector.fetchTokenDetails(
      '0x8d3e855f3f55109d473735ab76f753218400fe96',
    );
    console.log('TOKEN DETAILS: ', result2);
    console.log('TOKEN PRICE PARSED', parseFloat(result2.token.derivedETH));

    const connectorDetails = UniswapTokenDetailsFactory.toConnectorTokenDetails(
      result2 as IUniswapTokenDetails,
    );
    console.log('TOKEN DETAILS CONNECTOR', connectorDetails);
  }
}
