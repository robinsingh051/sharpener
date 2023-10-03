import { Switch, Route, BrowserRouter } from "react-router-dom";
import React, { useContext } from "react";
import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import AuthContext, { AuthContextProvider } from "./store/auth-context";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path="/" exact>
              <HomePage />
            </Route>
            {!authCtx.isLoggedIn && (
              <Route path="/auth">
                <AuthPage />
              </Route>
            )}
            <Route path="/profile">
              {authCtx.isLoggedIn && <UserProfile />}
              {!authCtx.isLoggedIn && <Redirect to="/" />}
            </Route>
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </Layout>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
