import * as React from "react";
import { mount } from "enzyme";
import { findByTestAttr } from "../../test/testUtils";
import App from "../App";
import * as hooks from "../hooks/getSecretWord";

// Mocks
const getSecretWordMock = jest.fn(() => Promise.resolve("party"));

const setup = () => {
  getSecretWordMock.mockClear();
  hooks.getSecretWord = getSecretWordMock;

  /*   const useReducerMock = jest.fn(() => {
    return { data: secretWord, status: "success", error: null }, jest.fn();
  });

  React.useReducer = useReducerMock; */

  const app = mount(<App />);
  return app;
};

test("renders without errors", () => {
  const wrapper = setup();
  const appContainer = findByTestAttr(wrapper, "app-container");
  expect(appContainer).toHaveLength(1);
});

describe("getSecretWord calls", () => {
  test("getSecretWord runs on App mount", () => {
    setup();

    expect(getSecretWordMock).toHaveBeenCalled();
  });

  test("secretWord does not update on app update", () => {
    // Setup
    const wrapper = setup();

    // Clear mock
    getSecretWordMock.mockClear();

    // Re-render
    wrapper.setProps();

    // Expect
    expect(getSecretWordMock).not.toHaveBeenCalled();
  });
});
