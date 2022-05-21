import React from "react";
import { createRoot } from "react-dom/client";
import { ApolloProvider } from "react-apollo";
import SongList from "./components/SongList";
import { InMemoryCache, ApolloClient } from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:4000/graphql",
});

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <ApolloProvider client={client}>
    <>Songs</>
    <SongList />
  </ApolloProvider>
);
