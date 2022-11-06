export const tokenDetailsQuery = (address: string) => {
  return `
    {
      token(id: "${address.toLowerCase()}") {
        id
        name
        symbol
        decimals
        derivedETH
      }
    }
  `;
};

export const tokenPriceInEthQuery = (address: string) => {
  return `
    {
      token(id: "${address.toLowerCase()}") {
        id
        derivedETH
      }
    }
  `;
};

export const ethPriceInUsdQuery = () => {
  return `
    {
      bundle(id: "1") {
        ethPrice
      }
    }
  `;
};

export const tokenDailyAggregatedQuery = (address: string) => {
  return `
  {
    tokenDayDatas(orderBy: date, orderDirection: asc,
    where: {
      token: "${address.toLowerCase()}"
    }
    ) {
      id
      date
      priceUSD
      totalLiquidityToken
      totalLiquidityUSD
      totalLiquidityETH
      dailyVolumeETH
      dailyVolumeToken
      dailyVolumeUSD
   }
  }`;
};
