import React from "react";

import Table from "react-bootstrap/Table";
import { useFilesTable } from "../hooks/FilesTable";
import SelectList from "./SelectList";
import Alert from "react-bootstrap/Alert";
import { InfoIcon } from "@primer/octicons-react";

const App = () => {
  const { files, filesList, loading, columns, onChangeFilesList } =
    useFilesTable();

  return (
    <>
      <SelectList
        className="mb-2"
        items={filesList.map((value) => ({ name: value, value }))}
        placeholder="Select a file"
        onChange={onChangeFilesList}
      />

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

      {files.length === 0 && !loading && (
        <Alert variant="secondary">
          <InfoIcon size={24} />
          <span style={{ marginLeft: "10px" }}>
            There is no rows for the selected file
          </span>
        </Alert>
      )}
    </>
  );
};

export default App;
