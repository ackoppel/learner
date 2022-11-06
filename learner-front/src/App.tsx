import React, { useContext } from "react";
import "./App.css";
import { Redirect, Route, Switch } from "react-router";
import { AuthContext } from "./components/auth/AuthContext";
import { AppRoute } from "./components/route/appRoute";
import { Loader } from "./components/loader/loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ScreenDashboard = React.lazy(
  () => import("./screens/wallets/screenWallets")
);
const ScreenLogin = React.lazy(() => import("./screens/login/screenLogin"));
const ScreenRegister = React.lazy(
  () => import("./screens/register/screenRegister")
);
const ScreenSettings = React.lazy(
  () => import("./screens/settings/screenSettings")
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
            redirect="/wallets"
          />
          <AppRoute
            path="/register"
            isAllowed={!isAuthenticated}
            exact={true}
            component={ScreenRegister}
            redirect="/wallets"
          />
          <AppRoute
            path="/wallets"
            isAllowed={isAuthenticated}
            exact={true}
            component={ScreenDashboard}
            redirect="/login"
          />
          <AppRoute
            path="/settings"
            isAllowed={isAuthenticated}
            exact={true}
            component={ScreenSettings}
            redirect="/login"
          />
          <Route>
            <Redirect to="/wallets" />
          </Route>
        </Switch>
      </React.Suspense>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
