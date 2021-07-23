import React, { useContext } from "react";
import { AuthContext } from "../../components/auth/AuthContext";
import { Loader } from "../../components/loader/loader";
import { Frame } from "../../components/frame/frame";

const ScreenSettings: React.FC = () => {
  const { profile } = useContext(AuthContext);

  if (!profile) {
    return <Loader />;
  }

  // todo :: edit settings screen
  return (
    <Frame>
      <div className="settings">
        <div>
          <p>{profile.username}</p>
          <p>{profile.displayName}</p>
          <p>{profile.gender}</p>
          <p>{profile.description}</p>
        </div>
      </div>
    </Frame>
  );
};
export default ScreenSettings;
