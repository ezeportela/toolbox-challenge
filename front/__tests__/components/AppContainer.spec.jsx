import React from "react";
import { Provider, useSelector } from "react-redux";
import configureStore from "redux-mock-store"; // If you use redux-mock-store to create a mock store
import renderer from "react-test-renderer";
import AppContainer from "../../src/components/AppContainer";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn().mockImplementation((state) => state),
}));

describe("AppContainer (Snapshot)", () => {
  it("Should render component", () => {
    const mockStore = configureStore([]);
    const initialState = {
      loading: true,
      files: [],
    };
    useSelector.mockReturnValue(initialState);

    const store = mockStore(initialState);

    const component = renderer
      .create(
        <Provider store={store}>
          <AppContainer />
        </Provider>
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});
