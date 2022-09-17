import { useQuery } from "@apollo/client";
import React from "react";
import query from "../queries/CurrentUser";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const Header = () => {
  const { loading, error, data, refetch } = useQuery<{
    user?: { email?: string };
  }>(query);
  console.log({ user: data });
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Button>Icon</Button>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Auth demo
          </Typography>
          <Button color="inherit">
            {loading
              ? "Loading"
              : data?.user
              ? `Logged in as ${data?.user?.email}. Logout`
              : "please log in"}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
