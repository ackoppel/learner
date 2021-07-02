import React, { useState, useEffect } from 'react';
import './loginForm.css';
import { FormRow } from '../../../components/form/row/formRow';
import { useHistory } from 'react-router-dom';
import { FormButton } from '../../../components/form/button/formButton';

export interface ILoginCredentials {
  username: string;
  password: string;
}

interface IProps {
  onSubmit: (username: string, password: string) => Promise<void>;
  errorMessage: string | null;
}

const initialState = {
  username: '',
  password: '',
};

export const LoginForm: React.FC<IProps> = ({ onSubmit, errorMessage }) => {
  const [credentials, setCredentials] =
    useState<ILoginCredentials>(initialState);
  const history = useHistory();

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
        type='text'
        placeholder='Username'
        value={credentials.username}
        onChange={(value) =>
          setCredentials((prev) => ({ ...prev, username: value }))
        }
        size='large'
      />
      <FormRow
        type='password'
        placeholder='Password'
        value={credentials.password}
        onChange={(value) =>
          setCredentials((prev) => ({ ...prev, password: value }))
        }
        size='large'
      />
      <FormButton
        text='Login'
        type='submit'
        size='large'
      />
      <FormButton
        text='Create an account'
        type='button'
        size='large'
        onClick={() => history.push('/register')}
      />
    </form>
  );
};
