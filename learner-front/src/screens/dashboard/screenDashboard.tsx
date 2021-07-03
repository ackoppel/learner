import React, { useContext } from "react";
import { AuthContext } from "../../components/auth/AuthContext";

export const ScreenDashboard: React.FC = () => {
  const { profile } = useContext(AuthContext);

  return (
    <div>
      {"Dashboard"}
      {"Learner"}
      {`Welcome ${profile?.displayName}`}
    </div>
  );
};
