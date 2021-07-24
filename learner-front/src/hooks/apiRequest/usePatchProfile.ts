import axios from "axios";
import { getIdentity } from "../../helper/getIdentity";
import { getApiRequestHeaders } from "../../helper/getApiRequestHeaders";

export interface IUsePatchProfile {
  patchProfile: (values: {
    displayName: string;
    description: string;
    gender: string;
  }) => Promise<void>;
}

export const usePatchProfile = (): IUsePatchProfile => {
  const { accessToken } = getIdentity();

  const patchProfile = async (values: {
    displayName: string;
    description: string;
    gender: string;
  }): Promise<void> => {
    try {
      await axios.patch(`${process.env.REACT_APP_API_URL}/profile`, values, {
        headers: getApiRequestHeaders(accessToken),
      });
    } catch (e) {
      if (e.response.status === 401 && accessToken) {
        localStorage.removeItem("identity");
      }
      throw new Error(e);
    }
  };

  return {
    patchProfile,
  };
};
