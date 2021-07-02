import React, { useState } from "react";
import { useRegister } from "../../hooks/apiRequest/useRegister";
import { IRegisterCredentials, RegisterForm } from "./registerForm";
import { RouteComponentProps } from "react-router-dom";

export const ScreenRegister: React.FC<RouteComponentProps> = ({ history }) => {
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
      <RegisterForm onSubmit={onSubmit} errorMessage={errorMessage} />
    </div>
  );
};
