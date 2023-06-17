import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Table from "react-bootstrap/Table";
import { FileRestService } from "./lib/FileRestService";

const App = () => {
  const [files, setFiles] = useState([]);

  async function getFiles() {
    const response = await new FileRestService().getFiles();
    setFiles(response.data);
  }

  useEffect(() => {
    getFiles();
  }, []);

  const columns = ["File Name", "Text", "Number", "Hex"];
  return (
    <>
      <Navbar expand="lg" className="bg-danger" variant="dark" fixed="top">
        <Container>
          <Navbar.Brand href="#home">React Test App</Navbar.Brand>
        </Container>
      </Navbar>

      <Container className="mt-5">
        <section>
          <Table responsive>
            <thead>
              <tr>
                {columns.map((col) => (
                  <th>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {files.map((file) =>
                file.lines.map((line) => (
                  <tr key={line.hex}>
                    <td>{file.file}</td>
                    <td>{line.text}</td>
                    <td>{line.number}</td>
                    <td>{line.hex}</td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </section>
      </Container>
    </>
  );
};

export default App;
