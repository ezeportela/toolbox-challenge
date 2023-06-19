import React from "react";
import renderer from "react-test-renderer";
import SelectList from "../../src/components/SelectList";
import { filesList } from "../mocks/files.mocks";

describe("SelectList (Snapshot)", () => {
  it("Should render component", () => {
    const props = {
      items: filesList.map((value) => ({ name: value, value })),
      placeholder: "select list",
      onChange: (target) => target,
      className: "",
    };
    const component = renderer.create(<SelectList {...props} />).toJSON();
    expect(component).toMatchSnapshot();
  });
});
