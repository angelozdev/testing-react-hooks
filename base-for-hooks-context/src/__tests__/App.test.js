import * as React from "react";
import { mount } from "enzyme";
import { findByTestAttr } from "../../test/testUtils";
import App from "../App";
import * as hooks from "../hooks/getSecretWord";

// Mocks
const secretWordMock = "party";
const getSecretWordMock = jest.fn(() => Promise.resolve(secretWordMock));

const setup = (secretWord = null, status = "idle", error = null) => {
  getSecretWordMock.mockClear();
  hooks.getSecretWord = getSecretWordMock;

  const useReducerMock = jest.fn(() => {
    return [{ data: secretWord, status, error }, jest.fn()];
  });

  React.useReducer = useReducerMock;

  const app = mount(<App />);
  return app;
};

test("renders without errors", () => {
  const wrapper = setup(null, "success");
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

describe("status is success", () => {
  // Setup
  let wrapper;

  beforeEach(() => {
    wrapper = setup(secretWordMock, "success");
  });

  test("does not render spinner when secretWord is not null", () => {
    const spinner = findByTestAttr(wrapper, "spinner");

    expect(spinner.exists()).toBe(false);
  });
});

describe("status is loading", () => {
  // Setup
  let wrapper;

  beforeEach(() => {
    wrapper = setup(null, "loading");
  });

  test("renders spinner when status is loading", () => {
    const spinner = findByTestAttr(wrapper, "spinner");

    expect(spinner.exists()).toBe(true);
  });
});

describe("status is failed", () => {
  // Setup
  let wrapper;

  beforeEach(() => {
    wrapper = setup(null, "failed", { message: "Error testing" });
  });

  test("renders spinner when status is failed", () => {
    const error = findByTestAttr(wrapper, "error");

    expect(error.exists()).toBe(true);
  });
});
