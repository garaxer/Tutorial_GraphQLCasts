import { useQuery } from "@apollo/client";
import React from "react";
import query from "../queries/CurrentUser";

const Header = () => {
  const { loading, error, data, refetch } = useQuery<{
    user?: { email?: string };
  }>(query);
  console.log({ user: data });
  return (
    <div>
      <h1>Header</h1>
      <span>
        {data?.user ? `Logged in as ${data?.user?.email}` : "please log in"}
      </span>
    </div>
  );
};

export default Header;
