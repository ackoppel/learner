import axios from "axios";
import { getIdentity } from "../../helper/getIdentity";
import { ChainType } from "../../core/chain";
import { getApiRequestHeaders } from "../../helper/getApiRequestHeaders";

interface IAddAddressResponse {
  id: string;
  contractAddress: string;
  coin: ChainType;
  coinBalance: string;
  lastSync: Date;
}

interface IUseAddAddress {
  addAddress: (
    address: string,
    chain: ChainType
  ) => Promise<IAddAddressResponse>;
}

export const useAddAddress = (): IUseAddAddress => {
  const { accessToken } = getIdentity();

  const addAddress = async (
    address: string,
    chain: ChainType
  ): Promise<IAddAddressResponse> => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/address`,
        {
          address,
          chain,
        },
        {
          headers: getApiRequestHeaders(accessToken),
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
    addAddress,
  };
};
