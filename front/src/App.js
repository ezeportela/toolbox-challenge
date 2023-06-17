import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import AppNavBar from "./components/AppNavBar";
import AppContainer from "./components/AppContainer";
import FilesTable from "./components/FilesTable";
import { Provider } from "react-redux";
import { store } from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <AppNavBar />

      <AppContainer>
        <FilesTable />
      </AppContainer>
    </Provider>
  );
};

export default App;
