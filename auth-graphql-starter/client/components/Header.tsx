import { useQuery, useMutation } from "@apollo/client";
import React from "react";
import currentUser from "../queries/CurrentUser";
import logoutUserMutation from "../mutations/LogoutUser";
import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled } from "@mui/material";

const StyledLink = styled(Link)(() => ({
  color: "unset",
  textDecoration: "unset",
}));

const Header = () => {
  let navigate = useNavigate();

  const { loading, error, data, refetch } = useQuery<{
    user?: { email?: string };
  }>(currentUser);
  console.log({ user: data });
  const [logoutMutation, { loading: loadingLogout, error: errorLogout }] =
    useMutation(logoutUserMutation);

  const SignInOrSignUp = () => {
    return (
      <>
        <StyledLink to="signup" style={{ marginRight: "5px" }}>
          <Button color="inherit">Sign Up</Button>
        </StyledLink>

        <StyledLink to="login">
          <Button color="inherit">Login</Button>
        </StyledLink>
      </>
    );
  };

  const handleLogout = async() => {
    await logoutMutation({ refetchQueries: [{ query: currentUser }] });
    navigate("/")
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Button>Icon</Button>
          <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
            <StyledLink to="/">Auth demo</StyledLink>
          </Typography>

          {loading || loadingLogout ? (
            "Loading"
          ) : data?.user ? (
            <Button color="inherit" onClick={handleLogout}>
              Logged in as {data?.user?.email}. Logout
            </Button>
          ) : (
            SignInOrSignUp()
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
