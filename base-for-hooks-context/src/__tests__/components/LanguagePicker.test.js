import * as React from "react";
import LanguagePicker, { dataTestIds } from "../../components/LanguagePicker";
import { findByTestAttr, checkProps } from "../../../test/testUtils";
import { shallow } from "enzyme";

/* Mocks */
const setLanguageMock = jest.fn();
const setup = () => {
  const wrapper = shallow(<LanguagePicker setLanguage={setLanguageMock} />);
  return wrapper;
};

/* Tests */
test("renders without crashing", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, dataTestIds.COMPONENT);

  expect(component.exists()).toBeTruthy();
});

test("does not throw warning with expected props", () => {
  checkProps(LanguagePicker, { setLanguage: setLanguageMock });
});

test("renders non-zero language icons", () => {
  const wrapper = setup();
  const languageIcons = findByTestAttr(wrapper, dataTestIds.LANGUAGE_ICON);

  expect(languageIcons.length).toBeGreaterThan(0);
});

test("calls setLanguage on click", () => {
  const wrapper = setup();
  const languageIcons = findByTestAttr(wrapper, dataTestIds.LANGUAGE_ICON);
  const firstIcon = languageIcons.first();

  firstIcon.simulate("click");

  expect(setLanguageMock).toHaveBeenCalled();
});
