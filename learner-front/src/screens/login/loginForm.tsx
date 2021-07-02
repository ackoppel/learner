import React, { useState, useEffect } from "react";
import "./loginForm.css";
import { FormRow } from "../../components/form/formRow";

export interface ILoginCredentials {
  username: string;
  password: string;
}

interface IProps {
  onSubmit: (username: string, password: string) => Promise<void>;
  errorMessage: string | null;
}

const initialState = {
  username: "",
  password: "",
};

export const LoginForm: React.FC<IProps> = ({ onSubmit, errorMessage }) => {
  const [credentials, setCredentials] =
    useState<ILoginCredentials>(initialState);

  useEffect(() => {
    if (errorMessage) {
      setCredentials(initialState);
    }
  }, [errorMessage]);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await onSubmit(credentials.username, credentials.password);
      }}
    >
      {errorMessage && <p>{errorMessage}</p>}
      <FormRow
        type="text"
        placeholder="username"
        value={credentials.username}
        onChange={(value) =>
          setCredentials((prev) => ({ ...prev, username: value }))
        }
        size="large"
      />
      <FormRow
        type="password"
        placeholder="password"
        value={credentials.password}
        onChange={(value) =>
          setCredentials((prev) => ({ ...prev, password: value }))
        }
        size="large"
      />
      <button type="submit">Login</button>
    </form>
  );
};
