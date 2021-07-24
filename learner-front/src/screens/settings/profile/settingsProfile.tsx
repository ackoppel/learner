import React, { useContext } from "react";
import { AuthContext } from "../../../components/auth/AuthContext";
import { Loader } from "../../../components/loader/loader";

export const SettingsProfile: React.FC = () => {
  const { profile } = useContext(AuthContext);

  if (!profile) return <Loader />;

  return (
    <div className="settings-profile">
      <p>{profile.username}</p>
      <p>{profile.displayName}</p>
      <p>{profile.gender}</p>
      <p>{profile.description}</p>
    </div>
  );
};
