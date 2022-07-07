import React from "react";

type Props = {
  children?: React.ReactNode;
};
const App = ({ children }: Props) => {
  console.log(children);
  return <div className="container">s{children}</div>;
};

export default App;
