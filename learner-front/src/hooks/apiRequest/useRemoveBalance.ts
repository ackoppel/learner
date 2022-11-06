import axios from "axios";
import { ChainType } from "../../core/chain";
import { getApiRequestHeaders } from "../../helper/getApiRequestHeaders";
import { getIdentity } from "../../helper/getIdentity";

interface IUseRemoveBalance {
  removeBalance: (
    userAddress: string,
    tokenAddress: string,
    chain: ChainType
  ) => Promise<void>;
}

export const useRemoveBalance = (): IUseRemoveBalance => {
  const { accessToken } = getIdentity();

  const removeBalance = async (
    userAddress: string,
    tokenAddress: string,
    chain: ChainType
  ): Promise<void> => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/token-balance?userAddress=${userAddress}&tokenAddress=${tokenAddress}&chain=${chain}`,
        {
          headers: getApiRequestHeaders(accessToken),
        }
      );
    } catch (e) {
      if (e.response.status === 401 && accessToken) {
        localStorage.removeItem("identity");
      }
      throw new Error(e);
    }
  };

  return {
    removeBalance,
  };
};
