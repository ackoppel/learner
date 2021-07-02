import React from "react";
import { Route, Redirect } from "react-router";

interface IProps {
  path: string;
  isAllowed: boolean;
  exact: boolean;
  component: React.FC<any>;
  redirect: string;
}

export const AppRoute: React.FC<IProps> = ({
  component,
  isAllowed,
  path,
  exact,
  redirect,
}) => {
  return (
    <Route
      path={path}
      exact={exact}
      render={(props) =>
        isAllowed ? (
          <Route path={path} exact={exact} component={component} />
        ) : (
          <Redirect to={redirect} />
        )
      }
    />
  );
};
