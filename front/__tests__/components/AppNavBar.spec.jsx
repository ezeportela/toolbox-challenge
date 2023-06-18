import React from "react";
import AppNavBar from "../../src/components/AppNavBar";
import renderer from "react-test-renderer";

describe("AppNavBar (Snapshot)", () => {
  it("Should render component", () => {
    const component = renderer.create(<AppNavBar />).toJSON();
    expect(component).toMatchSnapshot();
  });
});
