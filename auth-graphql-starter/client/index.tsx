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
          <Route index element={<>Foo</>} />
          <Route path="songs" element={<>Fighters</>} />
        </Route>
      </Routes>
    </ApolloProvider>
  </HashRouter>
);
