import { useState } from "react";
import { ChainType } from "../../core/chain";
import { useMessage } from "../../hooks/helper/useMessage";
import { useRemoveAddress } from "../../hooks/apiRequest/useRemoveAddress";

interface IUseDeleteAddress {
  isLoading: boolean;
  hasError: boolean;
  deleteAddress: (contractAddress: string, chain: ChainType) => Promise<void>;
}

export const useDeleteAddress = (): IUseDeleteAddress => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const { removeAddress } = useRemoveAddress();
  const { error, success } = useMessage();

  const deleteAddress = async (
    contractAddress: string,
    chain: ChainType
  ): Promise<void> => {
    setHasError(false);
    setIsLoading(true);
    try {
      await removeAddress(contractAddress, chain);
      success(
        `${chain.charAt(0).toUpperCase() + chain.slice(1)} address removed`
      );
    } catch (e) {
      setHasError(true);
      error("Something went wrong, please try again!");
    }
    setIsLoading(false);
  };

  return {
    isLoading,
    hasError,
    deleteAddress,
  };
};
