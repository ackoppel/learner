import { useState } from "react";
import { useMessage } from "../../helper/useMessage";
import { useAddBalance } from "../../hooks/apiRequest/useAddBalance";

interface IUsePostBalance {
  isLoading: boolean;
  hasError: boolean;
  postBalance: (
    tokenAddress: string,
    userAddress: string,
    chain: string
  ) => Promise<void>;
}

export const usePostBalance = (): IUsePostBalance => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const { addBalance } = useAddBalance();
  const { success, error } = useMessage();

  const postBalance = async (
    tokenAddress: string,
    userAddress: string,
    chain: string
  ): Promise<void> => {
    setHasError(false);
    setIsLoading(true);
    try {
      const response = await addBalance(tokenAddress, userAddress, chain);
      success(`${response.symbol} balance added`);
    } catch (e) {
      setHasError(true);
      error("");
    }
    setIsLoading(false);
  };

  return {
    isLoading,
    hasError,
    postBalance,
  };
};
