import { useState } from "react";
import { useGetCoins } from "../../../../hooks/apiRequest/useGetCoins";

interface IUseFetchCoins {
  chains: string[];
  fetchChains: () => void;
  hasError: boolean;
}

export const useFetchChains = (): IUseFetchCoins => {
  const [chains, setChains] = useState<string[]>([]);
  const [hasError, setHasError] = useState<boolean>(false);
  const { getCoins } = useGetCoins();

  const fetchChains = async () => {
    try {
      const coins = await getCoins();
      setChains(coins.map((coin) => coin.name));
    } catch (e) {
      setHasError(true);
      setChains([]);
    }
  };

  return {
    fetchChains,
    chains,
    hasError,
  };
};
