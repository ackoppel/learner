import { useState } from "react";
import { useMessage } from "../../helper/useMessage";
import { usePatchProfile } from "../../hooks/apiRequest/usePatchProfile";

interface IUseUpdateProfile {
  isLoading: boolean;
  hasError: boolean;
  updateProfile: (formValues: {
    displayName: string;
    description: string;
    gender: string;
  }) => void;
}

export const useUpdateProfile = (): IUseUpdateProfile => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const { error, success } = useMessage();
  const { patchProfile } = usePatchProfile();

  const updateProfile = async (formValues: {
    displayName: string;
    description: string;
    gender: string;
  }): Promise<void> => {
    setIsLoading(true);
    try {
      await patchProfile(formValues);
      success("Successfully updated!");
    } catch (e) {
      setHasError(true);
      error("Something went wrong, please try again!");
    }
    setIsLoading(false);
  };

  return {
    isLoading,
    hasError,
    updateProfile,
  };
};
