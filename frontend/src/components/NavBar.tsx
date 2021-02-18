import React from "react";
import { useAuth0 } from "../auth0";
import { Link } from "react-router-dom";

export const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div>
      {!isAuthenticated && (
        <button onClick={() => loginWithRedirect()}>Log in</button>
      )}
      {isAuthenticated && (
        <>
          <div>
            <button onClick={() => logout()}>Log out</button>
          </div>
          <span>
            <Link to="/">Home</Link> | <Link to="/profile">Profile</Link> |{" "}
            <Link to="/events">Events</Link>
          </span>
        </>
      )}
    </div>
  );
};
