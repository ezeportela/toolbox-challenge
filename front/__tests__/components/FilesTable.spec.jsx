import React from "react";
import FilesTable from "../../src/components/FilesTable";
import { Provider, useSelector } from "react-redux";
import configureStore from "redux-mock-store"; // If you use redux-mock-store to create a mock store
import renderer from "react-test-renderer";
import nock from "nock";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn().mockImplementation((state) => state),
}));

describe("FilesTable (Snapshot)", () => {
  it("Should render component", () => {
    nock("http://localhost:8080")
      .get("/files/data")
      .reply(200, [
        {
          file: "file.csv",
          lines: [
            {
              text: "jOVwNAfWqtHYRNlT",
              number: 16,
              hex: "202cc29bb691e6433e3684cf7daa9f4f",
            },
          ],
        },
      ]);

    const mockStore = configureStore([]);
    const initialState = {
      loading: false,
      files: [
        {
          file: "file.csv",
          lines: [
            {
              text: "jOVwNAfWqtHYRNlT",
              number: 16,
              hex: "202cc29bb691e6433e3684cf7daa9f4f",
            },
          ],
        },
      ],
    };
    useSelector.mockReturnValue(initialState);

    const store = mockStore(initialState);

    const component = renderer
      .create(
        <Provider store={store}>
          <FilesTable />
        </Provider>
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});
