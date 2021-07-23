import { useState } from "react";
import { ChainType } from "../../core/chain";
import { useRemoveBalance } from "../../hooks/apiRequest/useRemoveBalance";
import { useMessage } from "../../helper/useMessage";

interface IUseDeleteBalance {
  isLoading: boolean;
  hasError: boolean;
  deleteBalance: (
    userAddress: string,
    tokenAddress: string,
    chain: ChainType
  ) => void;
}

export const useDeleteBalance = (): IUseDeleteBalance => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const { success, error } = useMessage();
  const { removeBalance } = useRemoveBalance();

  const deleteBalance = async (
    userAddress: string,
    tokenAddress: string,
    chain: ChainType
  ): Promise<void> => {
    setIsLoading(true);
    try {
      await removeBalance(userAddress, tokenAddress, chain);
      success(
        `${
          chain.charAt(0).toUpperCase() + chain.slice(1).toLowerCase()
        } token balance removed`
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
    deleteBalance,
  };
};
