import React from "react";
import { createRoot } from "react-dom/client";
import { InMemoryCache, ApolloClient, ApolloProvider } from "@apollo/client";
import { Routes, BrowserRouter, Route, Outlet } from "react-router-dom";

const client = new ApolloClient({
  cache: new InMemoryCache({
    dataIdFromObject: (o: any) => o.id, // Every record returned will be passed through here and cached
  }),
  uri: "http://localhost:4000/graphql",
});

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <div>Auth Starter</div>
    </ApolloProvider>
  </BrowserRouter>
);
