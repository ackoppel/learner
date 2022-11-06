import React, { useState } from "react";
import { useRegister } from "../../hooks/apiRequest/useRegister";
import { IRegisterCredentials, RegisterForm } from "./registerForm";
import { RouteComponentProps } from "react-router-dom";
import { Logo } from "../../components/logo/logo";
import "./screenRegister.css";

const ScreenRegister: React.FC<RouteComponentProps> = ({ history }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { registerUser } = useRegister();

  const onSubmit = async (credentials: IRegisterCredentials): Promise<void> => {
    if (credentials.password !== credentials.rePassword) {
      setErrorMessage("Passwords did not match");
      return;
    }
    const register = await registerUser(
      credentials.username,
      credentials.password
    );
    if (register.error) {
      setErrorMessage(register.error);
      return;
    }
    history.push("/login");
  };

  return (
    <div className="register">
      <Logo />
      <div className="wrapper">
        <Logo showText={true} />
        <RegisterForm onSubmit={onSubmit} errorMessage={errorMessage} />
      </div>
    </div>
  );
};

export default ScreenRegister;
