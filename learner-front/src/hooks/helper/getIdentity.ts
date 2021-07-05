import { IUserIdentity } from "../../components/auth/AuthContext";

export const getIdentity = (): { accessToken: null } | IUserIdentity => {
  const identity = localStorage.getItem("identity");
  if (identity) {
    try {
      return JSON.parse(identity) as IUserIdentity;
    } catch (e) {
      return { accessToken: null };
    }
  }
  return { accessToken: null };
};
