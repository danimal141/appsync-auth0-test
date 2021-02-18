import React, { useEffect } from "react";
import { Route, RouteProps } from "react-router-dom";
import { useAuth0 } from "../auth0";

export const PrivateRoute: React.FC<RouteProps> = ({
  component: Component,
  path,
  ...rest
}) => {
  const { loading, isAuthenticated, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (loading || isAuthenticated) {
      return;
    }
    (async () => {
      await loginWithRedirect({
        appState: { targetUrl: window.location.pathname },
      });
    })();
  }, [loading, isAuthenticated, loginWithRedirect, path]);

  const render: RouteProps["render"] = (props) => {
    if (isAuthenticated && Component != null) {
      return <Component {...props} />;
    }

    return null;
  };

  return <Route path={path} render={render} {...rest} />;
};
