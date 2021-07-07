import axios from "axios";
import { getIdentity } from "../helper/getIdentity";

interface IAddAddressResponse {
  id: string;
  contractAddress: string;
  coin: string;
  coinBalance: string;
  lastSync: Date;
}

interface IUseAddAddress {
  addAddress: (address: string, chain: string) => Promise<IAddAddressResponse>;
}

export const useAddAddress = (): IUseAddAddress => {
  const { accessToken } = getIdentity();

  const addAddress = async (
    address: string,
    chain: string
  ): Promise<IAddAddressResponse> => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/address`,
        {
          address,
          chain,
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
      // console.log(e.response);
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
