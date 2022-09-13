import React from "react";
import { createRoot } from "react-dom/client";
import { ApolloProvider } from "react-apollo";
import SongList from "./components/SongList";
import { InMemoryCache, ApolloClient } from "@apollo/client";
import { Routes, BrowserRouter, Route, Outlet } from "react-router-dom";
import App from "./components/App";
import SongCreate from "./components/SongCreate";
import SongDetail from "./components/SongDetail";

const client = new ApolloClient({
  cache: new InMemoryCache({
    dataIdFromObject: (o: any) => o.id,
  }),
  uri: "http://localhost:4000/graphql",
});

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <>Songs</>
      <Routes>
        <Route
          path="/"
          element={
            <App>
              <Outlet />
            </App>
          }
        >
          <Route index element={<SongCreate />} />
          <Route path="songs" element={<SongList />} />
          <Route path="songs/:id" element={<SongDetail />} />
        </Route>
      </Routes>
    </ApolloProvider>
  </BrowserRouter>
);
