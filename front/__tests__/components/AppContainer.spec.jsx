import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import renderer from "react-test-renderer";
import AppContainer from "../../src/components/AppContainer";

describe("AppContainer (Snapshot)", () => {
  it("Should render component", () => {
    const mockStore = configureStore([]);
    const initialState = {
      loading: true,
    };

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
