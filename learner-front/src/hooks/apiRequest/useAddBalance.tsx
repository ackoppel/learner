import axios from "axios";
import { getIdentity } from "../helper/getIdentity";

// todo :: move the interface into more generic location
interface ITokenResponse {
  id: string;
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  logoUrl: string;
  coin: string;
  priceInCoin: string;
  priceUsd: string;
  lastSync: Date;
}

interface IUseAddBalance {
  addBalance: (
    tokenAddress: string,
    userAddress: string,
    chain: string
  ) => Promise<ITokenResponse>;
}

export const useAddBalance = (): IUseAddBalance => {
  const { accessToken } = getIdentity();

  const addBalance = async (
    tokenAddress: string,
    userAddress: string,
    chain: string
  ): Promise<ITokenResponse> => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/token?chain=${chain}`,
        {
          tokenAddress,
          userAddress,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-type": "application/json",
          },
        }
      );
      return response.data;
    } catch (e) {
      if (e.response.status === 401 && accessToken) {
        localStorage.removeItem("identity");
      }
      throw new Error(e);
    }
  };

  return {
    addBalance,
  };
};
