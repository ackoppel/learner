import { useState } from "react";
import { useAddAddress } from "../../hooks/apiRequest/useAddAddress";
import { useMessage } from "../../hooks/helper/useMessage";
import { ChainType } from "../../core/chain";

interface IUsePostAddress {
  isLoading: boolean;
  hasError: boolean;
  postAddress: (address: string, chain: ChainType) => Promise<void>;
}

export const usePostAddress = (): IUsePostAddress => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const { addAddress } = useAddAddress();
  const { success, error } = useMessage();

  const postAddress = async (
    address: string,
    chain: ChainType
  ): Promise<void> => {
    setHasError(false);
    setIsLoading(true);
    try {
      await addAddress(address, chain);
      success(
        `${
          chain.charAt(0).toUpperCase() + chain.slice(1).toLowerCase()
        } address added`
      );
    } catch (e) {
      setHasError(true);
      error("Something went wrong, please try again");
    }
    setIsLoading(false);
  };

  return {
    isLoading,
    hasError,
    postAddress,
  };
};
