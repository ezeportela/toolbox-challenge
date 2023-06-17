import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { FileRestService } from "./lib/FileRestService";
import AppNavBar from "./components/AppNavBar";
import AppContainer from "./components/AppContainer";
import FilesTable from "./components/FilesTable";

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
      <AppNavBar />

      <AppContainer>
        <FilesTable />
      </AppContainer>
    </>
  );
};

export default App;
