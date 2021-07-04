import React, { useContext } from "react";
import "./App.css";
import { Redirect, Route, Switch } from "react-router";
import { AuthContext } from "./components/auth/AuthContext";
import { AppRoute } from "./components/route/appRoute";
import { Loader } from "./components/loader/loader";

const ScreenDashboard = React.lazy(
  () => import("./screens/dashboard/screenDashboard")
);
const ScreenLogin = React.lazy(() => import("./screens/login/screenLogin"));
const ScreenRegister = React.lazy(
  () => import("./screens/register/screenRegister")
);

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="App">
      <React.Suspense fallback={<Loader />}>
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
      </React.Suspense>
    </div>
  );
}

export default App;
