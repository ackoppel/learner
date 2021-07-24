import React, { useContext, useState } from "react";
import { AuthContext } from "../../components/auth/AuthContext";
import { Loader } from "../../components/loader/loader";
import { Frame } from "../../components/frame/frame";
import { SettingsProfile } from "./profile/settingsProfile";
import {
  IFormValues,
  SettingsProfileEditForm,
} from "./profile/settingsProfileEditForm";
import "./screenSettings.css";
import { useUpdateProfile } from "./useUpdateProfile";
import { FormButton } from "../../components/form/button/formButton";

const ScreenSettings: React.FC = () => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const { isLoading, hasError, updateProfile } = useUpdateProfile();
  const { profile, refreshProfile } = useContext(AuthContext);

  if (!profile) {
    return <Loader />;
  }

  const onUpdate = async (values: IFormValues) => {
    await updateProfile(values);
    if (!isLoading && !hasError) {
      refreshProfile();
    }
  };

  // todo :: edit settings screen
  return (
    <Frame>
      <div className="settings">
        {!editMode && <SettingsProfile />}
        {!editMode && (
          <FormButton
            type="button"
            text="Edit"
            size="large"
            onClick={() => setEditMode(true)}
          />
        )}
        {editMode && <SettingsProfileEditForm onUpdate={onUpdate} />}
        {editMode && (
          <FormButton
            type="button"
            text="View"
            size="large"
            onClick={() => setEditMode(false)}
          />
        )}
      </div>
    </Frame>
  );
};
export default ScreenSettings;
