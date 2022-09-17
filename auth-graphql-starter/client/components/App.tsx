import React, { PropsWithChildren } from "react";
import Header from "./Header";

const App = ({ children }: PropsWithChildren<{}>) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default App;
