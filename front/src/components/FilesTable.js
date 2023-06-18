import React from "react";

import Table from "react-bootstrap/Table";
import { useFilesTable } from "../hooks/FilesTable";
import SelectList from "./SelectList";

const App = () => {
  const { files, filesList, columns } = useFilesTable();

  return (
    <>
      {filesList.length > 0 && (
        <SelectList
          className="mb-4"
          items={filesList.map((value) => ({ name: value, value }))}
          placeholder="Select a file"
        />
      )}
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
