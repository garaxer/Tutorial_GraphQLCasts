import { useQuery } from "@apollo/client";
import React, { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router";
import currentUser from "../queries/CurrentUser";

const RequireAuth = ({ children }: PropsWithChildren<{}>) => {
  const navigate = useNavigate();

  const { data: loggedInUser, loading } = useQuery<{
    user?: { email?: string };
  }>(currentUser);

  useEffect(() => {
    !loading && !loggedInUser?.user && navigate("/");
  }, [loading, loggedInUser]);

  return <>{children}</>;
};

export default RequireAuth;
