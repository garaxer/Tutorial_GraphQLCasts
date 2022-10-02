import { useMutation, useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AuthForm from "./AuthForm";
import loginUser from "../mutations/LoginUser";
import currentUser from "../queries/CurrentUser";
import { useNavigate } from "react-router-dom";
const LoginBox = styled("div")`
  max-width: 500px;
`;
const CentreBox = styled("div")`
  display: flex;
  justify-content: center;
  padding: 10px;
`;
const LoginForm = () => {
  const [loginErrors, setLoginErrors] = useState<string[]>([]);
  const [mutate, { loading, error }] = useMutation(loginUser);

  let navigate = useNavigate();

  //TODO Place this into context instead
  const { data: loggedInUser } = useQuery<{
    user?: { email?: string };
  }>(currentUser);
  console.log(loggedInUser);
  useEffect(() => {
    loggedInUser?.user && navigate(`/dashboard`);
  }, [loggedInUser]);

  const onSubmit = async ({ email, password }: AuthForm) => {
    await mutate({
      variables: { email, password },
      refetchQueries: [{ query: currentUser }],
    })
      .then(() => navigate(`/dashboard`)) // not needed?
      .catch((res: { graphQLErrors: { message: string }[] }) =>
        setLoginErrors(res.graphQLErrors.map((error) => error.message))
      );
  };
  return (
    <CentreBox>
      <LoginBox>
        <Typography>Login</Typography>
        {loading ? (
          "loading..."
        ) : (
          <AuthForm onSubmit={onSubmit} errors={loginErrors} />
        )}
        {error &&
          `Error logging in: ${error.graphQLErrors.reduce(
            (a, c) => a + ". " + c.message,
            ""
          )}`}
      </LoginBox>
    </CentreBox>
  );
};

export default LoginForm;
