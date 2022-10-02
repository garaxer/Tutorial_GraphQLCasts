import React from "react";
import { createRoot } from "react-dom/client";
import {
  InMemoryCache,
  ApolloClient,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";
import { Routes, HashRouter, Route, Outlet } from "react-router-dom";
import App from "./components/App";
import LoginForm from "./components/LoginForm";
import "./style.css";
import SignUpForm from "./components/SignUpForm";
import Dashboard from "./components/Dashboard";
import RequireAuth from "./components/requireAuth";
const client = new ApolloClient({
  cache: new InMemoryCache({
    dataIdFromObject: (o: any) => o.id, // Every record returned will be passed through here and cached
  }),
  link: new HttpLink({
    uri: "/graphql",
    fetchOptions: {
      credentails: "same-origin",
    },
  }),
  uri: "/graphql",
});

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <HashRouter>
    <ApolloProvider client={client}>
      <Routes>
        <Route
          path="/"
          element={
            <App>
              <Outlet />
            </App>
          }
        >
          <Route
            index
            element={<>Foo - I am allowed to see this hero page</>}
          />
          <Route path="login" element={<LoginForm />} />
          <Route path="signup" element={<SignUpForm />} />
          <Route
            path="dashboard"
            element={
              // Replace parent component with login conditional
              // and use <Navigate replace to={"/"} />
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </ApolloProvider>
  </HashRouter>
);
