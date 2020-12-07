import * as React from "react";
import { shallow } from "enzyme";
import { findByTestAttr } from "../../test/testUtils";
import App from "../App";

const setup = () => {
  const app = shallow(<App />);
  return app;
};

test("renders without errors", () => {
  const wrapper = setup();
  const appContainer = findByTestAttr(wrapper, "app-container");
  expect(appContainer).toHaveLength(1);
});
