import React, { useState, useEffect } from 'react';
import { FormRow } from '../../components/form/row/formRow';
import { FormButton } from '../../components/form/button/formButton';

export interface IRegisterCredentials {
  username: string;
  password: string;
  rePassword: string;
}

interface IProps {
  onSubmit: (credentials: IRegisterCredentials) => Promise<void>;
  errorMessage: string | null;
}

const initialState = {
  username: '',
  password: '',
  rePassword: '',
};

export const RegisterForm: React.FC<IProps> = ({ onSubmit, errorMessage }) => {
  const [credentials, setCredentials] =
    useState<IRegisterCredentials>(initialState);

  useEffect(() => {
    if (errorMessage) {
      setCredentials(initialState);
    }
  }, [errorMessage]);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await onSubmit(credentials);
      }}
    >
      {errorMessage && <p>{errorMessage}</p>}
      <FormRow
        type='text'
        placeholder='Username'
        value={credentials.username}
        onChange={(value) =>
          setCredentials((prev) => ({
            ...prev,
            username: value,
          }))
        }
        size='large'
      />
      <FormRow
        type='password'
        placeholder='Password'
        value={credentials.password}
        onChange={(value) =>
          setCredentials((prev) => ({
            ...prev,
            password: value,
          }))
        }
        size='large'
      />
      <FormRow
        type='password'
        placeholder='Password again'
        value={credentials.rePassword}
        onChange={(value) =>
          setCredentials((prev) => ({
            ...prev,
            rePassword: value,
          }))
        }
        size='large'
      />
      <FormButton text='Register' type='submit' size='large' />
    </form>
  );
};
