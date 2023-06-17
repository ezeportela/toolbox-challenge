import React from "react";
import Container from "react-bootstrap/Container";

const AppContainer = ({ children }) => {
  return <Container className="mt-7 mb-5">{children}</Container>;
};

export default AppContainer;
