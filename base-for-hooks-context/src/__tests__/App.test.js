import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr } from "../../test/testUtils";
import App from "../App";

const setup = () => {
  return shallow(<App />);
};

test("renders without errors", () => {
  const wrapper = setup();
  const appContainer = findByTestAttr(wrapper, "app-container");
  expect(appContainer).toHaveLength(1);
});
