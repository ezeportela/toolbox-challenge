import React from "react";
import { useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";

const AppContainer = ({ children }) => {
  const { loading } = useSelector((state) => state);

  return (
    <Container className="mt-7 mb-5">
      {loading && (
        <div className="mt-5 mb-5 d-flex justify-content-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {children}
    </Container>
  );
};

export default AppContainer;
