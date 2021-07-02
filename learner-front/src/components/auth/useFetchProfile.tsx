import { IUserIdentity } from "./AuthContext";
import { useGetProfile } from "../../hooks/apiRequest/useGetProfile";
import { useState } from "react";

export interface IUseFetchProfile {
  // fetchProfile: (setIdentity: (profile: IUserIdentity | null) => void) => void;
  fetchProfile: () => void;
  profile: IUserIdentity | null;
  setProfile: (profile: IUserIdentity) => void;
}

export const useFetchProfile = (): IUseFetchProfile => {
  const { getProfile } = useGetProfile();
  const [profile, setProfile] = useState<IUserIdentity | null>(null);
  // setIdentity: (profile: IUserIdentity | null) => void
  const fetchProfile = async (): Promise<void> => {
    let result = null;
    try {
      result = await getProfile();
      // setIdentity(result);
      // console.log("RESULT:: ", result);
      setProfile(result);
    } catch (e) {
      setProfile(null);
      // setIdentity(null);
    }
    // return result;
  };

  return {
    fetchProfile,
    profile,
    setProfile,
  };
};
