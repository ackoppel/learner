import React from "react";
import { Link } from "react-router-dom";
import "./nav.css";

interface IProps {
  onMouseLeave: () => void;
  onLogout?: () => void;
}

export const Nav: React.FC<IProps> = ({ onMouseLeave, onLogout }) => {
  return (
    <nav onMouseLeave={onMouseLeave}>
      <h2>Learner</h2>
      <div className="selection">
        <Link to="/wallets">Wallets</Link>
        <Link to="/settings">Settings</Link>
        {onLogout && (
          <Link to="/" onClick={onLogout}>
            <p className="nav-logout">Logout</p>
          </Link>
        )}
      </div>
    </nav>
  );
};
