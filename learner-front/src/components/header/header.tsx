import React, { useContext, useState } from "react";
import { FormButton } from "../form/button/formButton";
import "./header.css";
import { AuthContext } from "../auth/AuthContext";
import { Nav } from "../nav/nav";
import { Overlay } from "../overlay/overlay";

export const Header: React.FC = () => {
  const [navOverlayOpen, setNavOverlayOpen] = useState<boolean>(false);

  const { logoutHandler } = useContext(AuthContext);
  return (
    <header>
      <h2 onMouseOver={() => setNavOverlayOpen(true)}>Learner</h2>
      <div className="logout">
        <FormButton
          text="Logout"
          type="button"
          size="large"
          onClick={logoutHandler}
        />
      </div>
      {navOverlayOpen && (
        <Overlay>
          <Nav
            onMouseLeave={() => setNavOverlayOpen(false)}
            onLogout={logoutHandler}
          />
        </Overlay>
      )}
    </header>
  );
};
