import React, { useContext } from "react";
import { FormButton } from "../form/button/formButton";
import "./header.css";
import { AuthContext } from "../auth/AuthContext";

export const Header: React.FC = () => {
  const { logoutHandler } = useContext(AuthContext);
  return (
    <header>
      <h2>Learner</h2>
      <div className="logout">
        <FormButton
          text="Logout"
          type="button"
          size="large"
          onClick={logoutHandler}
        />
      </div>
    </header>
  );
};
