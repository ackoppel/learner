interface ITokenBalance {
  contractAddress: string;
  tokenBalance: string;
}

export interface IAlchemyTokenBalance {
  result: {
    tokenBalances: ITokenBalance[];
  };
}
