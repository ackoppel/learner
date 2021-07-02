import React, { useContext, useState } from "react";
import { AuthContext } from "../../components/auth/AuthContext";
import { LoginForm } from "./form/loginForm";
import { Logo } from "../../components/logo/logo";
import "./screenLogin.css";

export const ScreenLogin: React.FC = () => {
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
      <Logo />
      <div className="wrapper">
        <Logo showText={true} />
        <LoginForm onSubmit={onSubmit} errorMessage={errorMessage} />
      </div>
    </div>
  );
};
