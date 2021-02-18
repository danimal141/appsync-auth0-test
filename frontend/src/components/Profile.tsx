import React from "react";
import { useAuth0 } from "../auth0";

export const Profile = () => {
  const { user } = useAuth0();

  return (
    <>
      <img src={user.picture} alt="Profile" />

      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <p>{user.sub}</p>
      <code>{JSON.stringify(user, null, 2)}</code>
    </>
  );
};
