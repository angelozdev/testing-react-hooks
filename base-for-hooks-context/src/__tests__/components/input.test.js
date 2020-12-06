import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr } from "../../../test/testUtils";
import Input from "../../components/Input";

const setup = () => {
  return shallow(<Input />);
};

test("renders without crashing", () => {
  const wrapper = setup();
  const inputContainer = findByTestAttr(wrapper, "input-container");

  expect(inputContainer).toHaveLength(1);
});
