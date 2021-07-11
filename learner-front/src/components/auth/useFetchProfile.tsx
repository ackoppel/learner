import { IUserIdentity } from "./AuthContext";
import { useGetProfile } from "../../hooks/apiRequest/useGetProfile";
import { useState } from "react";

export interface IUseFetchProfile {
  fetchProfile: () => void;
  profile: IUserIdentity | null;
  setProfile: (profile: IUserIdentity) => void;
}

export const useFetchProfile = (): IUseFetchProfile => {
  const { getProfile } = useGetProfile();
  const [profile, setProfile] = useState<IUserIdentity | null>(null);

  const fetchProfile = async (): Promise<void> => {
    let result = null;
    try {
      result = await getProfile();
      setProfile(result);
    } catch (e) {
      setProfile(null);
    }
  };

  return {
    fetchProfile,
    profile,
    setProfile,
  };
};
