import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { config } from "./lib/config";
import { FileRestService } from "./lib/FileRestService";

const App = () => {
  const [files, setFiles] = useState([]);

  async function getFiles() {
    const response = await new FileRestService().getFiles();
    setFiles(response.data);
  }

  useEffect(() => {
    getFiles();
  }, [files]);

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">React Test App</Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
};

export default App;
