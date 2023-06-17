import React from "react";

import Table from "react-bootstrap/Table";
import { useFilesTable } from "../hooks/FilesTable";

const App = () => {
  const { files } = useFilesTable();

  const columns = ["File Name", "Text", "Number", "Hex"];
  return (
    <>
      {files.length > 0 && (
        <Table responsive className="table-striped table-bordered files-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col}>{col}</th>
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
      )}
    </>
  );
};

export default App;
