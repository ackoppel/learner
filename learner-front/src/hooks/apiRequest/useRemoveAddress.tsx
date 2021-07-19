import axios from "axios";
import { getIdentity } from "../helper/getIdentity";
import { ChainType } from "../../core/chain";

interface IUseRemoveAddress {
  removeAddress: (contractAddress: string, chain: ChainType) => Promise<void>;
}

export const useRemoveAddress = (): IUseRemoveAddress => {
  const { accessToken } = getIdentity();

  const removeAddress = async (
    contractAddress: string,
    chain: ChainType
  ): Promise<void> => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/address?contract=${contractAddress}&chain=${chain}`,
        {
          headers: {
            Authorization: accessToken ? `Bearer ${accessToken}` : null,
          },
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
    removeAddress,
  };
};
