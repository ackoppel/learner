import React, { useContext } from "react";
import "./App.css";
import { Switch } from "react-router";
import { ScreenLogin } from "./screens/login/screenLogin";
import { AuthContext } from "./components/auth/AuthContext";
import { AppRoute } from "./components/route/appRoute";
import { ScreenRegister } from "./screens/register/screenRegister";

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
          redirect={"/"}
        />
        <AppRoute
          path="/register"
          isAllowed={!isAuthenticated}
          exact={true}
          component={ScreenRegister}
          redirect="/"
        />
      </Switch>
    </div>
  );
}

export default App;
