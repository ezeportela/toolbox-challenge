import React, { useEffect, useState } from "react";

import Table from "react-bootstrap/Table";
import { FileRestService } from "../lib/FileRestService";

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
      <Table responsive className="table-striped table-bordered files-table">
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
    </>
  );
};

export default App;
