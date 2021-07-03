import React, { useContext } from "react";
import "./App.css";
import { Redirect, Route, Switch } from "react-router";
import { ScreenLogin } from "./screens/login/screenLogin";
import { AuthContext } from "./components/auth/AuthContext";
import { AppRoute } from "./components/route/appRoute";
import { ScreenRegister } from "./screens/register/screenRegister";
import { ScreenDashboard } from "./screens/dashboard/screenDashboard";

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="App">
      <Switch>
        <AppRoute
          path="/login"
          isAllowed={!isAuthenticated}
          exact={true}
          component={ScreenLogin}
          redirect="/dashboard"
        />
        <AppRoute
          path="/register"
          isAllowed={!isAuthenticated}
          exact={true}
          component={ScreenRegister}
          redirect="/dashboard"
        />
        <AppRoute
          path="/dashboard"
          isAllowed={isAuthenticated}
          exact={true}
          component={ScreenDashboard}
          redirect="/login"
        />
        <Route>
          <Redirect to="/dashboard" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
