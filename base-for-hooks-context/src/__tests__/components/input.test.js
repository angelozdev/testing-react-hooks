import * as React from "react";
import { shallow } from "enzyme";
import { findByTestAttr } from "../../../test/testUtils";
import checkPropsTypes from "check-prop-types";
import Input, { dataAttrs } from "../../components/Input";

// Setup
const defaultProps = {
  secretWord: "party",
};

const setup = (props = defaultProps) => {
  return shallow(<Input {...props} />);
};

// Tests
test("renders without crashing", () => {
  const wrapper = setup();
  const inputContainer = findByTestAttr(wrapper, dataAttrs.container);

  expect(inputContainer).toHaveLength(1);
});

test("does not throw warning expected props", () => {
  const wrapper = setup();
  const propError = checkPropsTypes(
    wrapper.propTypes,
    { secretWord: "party" },
    "prop",
    wrapper.name
  );

  expect(propError).toBeUndefined();
});

describe("state controlled input field", () => {
  // Mocks
  const wordMock = "train";
  const setCurrentGuessWordMock = jest.fn();
  let wrapper;

  // Setup
  beforeEach(() => {
    setCurrentGuessWordMock.mockClear();
    React.useState = jest.fn(() => ["", setCurrentGuessWordMock]);

    wrapper = setup();
  });

  test("state update with value of input upon change", () => {
    // Mocks
    const eventMock = { target: { value: wordMock } };

    // Setup
    const input = findByTestAttr(wrapper, dataAttrs.input);

    // Simulate submit
    input.simulate("change", eventMock);

    //expect
    expect(setCurrentGuessWordMock).toHaveBeenCalledWith(wordMock);
  });

  test("field is cleared upon submit button click", () => {
    // Mocks
    const eventMock = { preventDefault: () => null };

    // Setup
    const form = findByTestAttr(wrapper, dataAttrs.form);

    // simulate submit
    form.simulate("submit", eventMock);

    // expect
    expect(setCurrentGuessWordMock).toHaveBeenCalledWith("");
  });
});
