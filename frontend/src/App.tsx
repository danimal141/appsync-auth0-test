import React from "react";
import { NavBar } from "./components/NavBar";
import { Router, Route, Switch } from "react-router-dom";
import { Home } from "./components/Home";
import { Profile } from "./components/Profile";
import { Events } from "./components/Events";
import { createBrowserHistory } from "history";
import { PrivateRoute } from "./components/PrivateRoute";
import { AuthorizedApolloProvider } from "./lib/AuthorizedApolloProvider";
import { Auth0Provider } from "./auth0";
import authConfig from "./auth0/config.json";

export const App = () => {
  const history = createBrowserHistory();

  const onRedirectCallback = async (url?: string) => {
    history.push(url ?? window.location.pathname);
  };

  return (
    <div className="App">
      <Auth0Provider
        domain={authConfig.domain}
        client_id={authConfig.clientId}
        redirect_uri={window.location.origin}
        audience={authConfig.audience}
        onRedirectCallback={onRedirectCallback}
      >
        <AuthorizedApolloProvider>
          <Router history={history}>
            <header>
              <NavBar />
            </header>
            <Switch>
              <Route path="/" exact component={Home} />
              <PrivateRoute path="/profile" component={Profile} />
              <PrivateRoute path="/events" component={Events} />
            </Switch>
          </Router>
        </AuthorizedApolloProvider>
      </Auth0Provider>
    </div>
  );
};
