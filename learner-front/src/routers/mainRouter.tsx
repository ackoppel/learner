import React from "react";
import { Route, Switch } from "react-router";
import AuthContextProvider from "../components/auth/AuthContext";
import App from "../App";

export const MainRouter: React.FC = () => {
  return (
    <AuthContextProvider>
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    </AuthContextProvider>
  );
};
