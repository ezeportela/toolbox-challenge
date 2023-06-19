import React from "react";
import FilesTable from "../../src/components/FilesTable";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import renderer from "react-test-renderer";
import { filesList, filesListContent } from "../mocks/files.mocks";
import { useFilesTable } from "../../src/hooks/FilesTable";

jest.mock("../../src/hooks/FilesTable", () => ({
  useFilesTable: jest.fn(),
}));

describe("FilesTable (Snapshot)", () => {
  function testComponent(loading = false, files = []) {
    const mockStore = configureStore([]);
    const initialState = {
      columns: ["File Name", "Text", "Number", "Hex"],
      loading,
      filesList,
      files,
    };
    // useSelector.mockReturnValue(initialState);
    useFilesTable.mockReturnValue(initialState);

    const store = mockStore(initialState);

    const component = renderer
      .create(
        <Provider store={store}>
          <FilesTable />
        </Provider>
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  }

  it("Should render component", () => {
    testComponent(false, filesListContent);
  });

  it("Should render component with loading", () => {
    testComponent(false, []);
  });
});
