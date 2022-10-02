import { useMutation, useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import AuthForm from "./AuthForm";
import signUpUser from "../mutations/SignUpUser";
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
const SignInForm = () => {
  const [mutate, { loading, error }] = useMutation(signUpUser);
  let navigate = useNavigate();

  //TODO Place this into context instead
  const { data: loggedInUser } = useQuery<{
    user?: { email?: string };
  }>(currentUser);
  console.log(loggedInUser);
  useEffect(() => {
    loggedInUser?.user && navigate("/dashboard");
  }, [loggedInUser]);

  const onSubmit = async ({ email, password }: AuthForm) => {
    await mutate({
      variables: { email, password },
      refetchQueries: [{ query: currentUser }],
    });
    navigate("/dashboard");
  };
  return (
    <CentreBox>
      <LoginBox>
        <Typography>Sign up</Typography>
        {loading ? "loading..." : <AuthForm onSubmit={onSubmit} />}
        {error && `Error logging in: ${error.message}`}
      </LoginBox>
    </CentreBox>
  );
};

export default SignInForm;
