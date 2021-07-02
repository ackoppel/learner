import React, { useContext, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { AuthContext } from "../../components/auth/AuthContext";
import { LoginForm } from "./loginForm";

export const ScreenLogin: React.FC<RouteComponentProps> = ({ history }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { loginHandler } = useContext(AuthContext);

  const onSubmit = async (
    username: string,
    password: string
  ): Promise<void> => {
    const login = await loginHandler(username, password);
    if ("error" in login) {
      setErrorMessage(login.error);
    }
  };

  return (
    <div className="login">
      <LoginForm onSubmit={onSubmit} errorMessage={errorMessage} />
    </div>
  );
};
