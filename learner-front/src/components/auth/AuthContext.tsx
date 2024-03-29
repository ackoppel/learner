import React, { createContext, useEffect } from "react";
import { useLogin } from "../../hooks/apiRequest/useLogin";
import { useFetchProfile } from "./useFetchProfile";
import { useHistory, useLocation } from "react-router-dom";
import { ChainType } from "../../core/chain";

export interface ITokenBalance {
  balanceId: string;
  address: string;
  name: string;
  symbol: string;
  priceInCoin: string;
  priceUsd: string;
  lastPriceSync: Date;
  balanceConverted: number;
  balanceValueUsd: number;
  lastBalanceSync: Date;
  logoUrl: string;
}

export interface IAddress {
  id: string;
  contractAddress: string;
  coinBalance: number;
  coinName: ChainType;
  coinPriceUsd: number;
  coinPriceLastSync: Date;
  totalBalanceUsd: number;
  tokenBalances: ITokenBalance[];
}

export interface IProfile {
  naturalId: string;
  username: string;
  displayName: string;
  gender: string;
  description: string;
  addresses: IAddress[];
}

export interface IUserIdentity {
  accessToken: string;
  profile: IProfile;
}

export interface IAuthContext {
  isAuthenticated: boolean;
  token: string | null;
  loginHandler: (
    username: string,
    password: string
  ) => Promise<{ success: boolean } | { error: string }>;
  logoutHandler: () => void;
  profile: IProfile | null;
  addresses: IAddress[];
  refreshProfile: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  isAuthenticated: false,
  token: null,
  loginHandler: async () => {
    return { error: "Not Implemented" };
  },
  logoutHandler: async () => {
    throw new Error("Not implemented");
  },
  profile: null,
  addresses: [],
  refreshProfile: () => {
    throw new Error("Not implemented");
  },
});

const getValuesFromProfile = (identity: IUserIdentity | null) => {
  if (!identity) {
    return {
      isAuthenticated: false,
      token: null,
      profile: null,
      addresses: [],
    };
  }
  return {
    isAuthenticated: true,
    token: identity.accessToken,
    profile: identity.profile,
    addresses: identity.profile.addresses,
  };
};

const AuthContextProvider: React.FC = ({ children }) => {
  const { profile, fetchProfile, setProfile } = useFetchProfile();
  const { login } = useLogin();
  const location = useLocation();
  const history = useHistory();

  const loginHandler = async (
    username: string,
    password: string
  ): Promise<{ success: boolean } | { error: string }> => {
    try {
      const identity = await login(username, password);
      storeIdentity(identity);
      return { success: true };
    } catch (e) {
      return { error: "Incorrect username or password" };
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("identity");
    history.push("/login");
  };

  const storeIdentity = (identity: IUserIdentity) => {
    localStorage.setItem("identity", JSON.stringify(identity));
    setProfile(identity);
  };

  useEffect(() => {
    fetchProfile();
  }, [location.pathname]);

  return (
    <AuthContext.Provider
      value={{
        ...getValuesFromProfile(profile),
        loginHandler,
        logoutHandler,
        refreshProfile: fetchProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
