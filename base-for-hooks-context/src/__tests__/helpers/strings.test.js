import * as stringsModule from "../../helpers/strings";

// Mocks
const strings = {
  en: {
    submit: "Submit",
  },
  emoji: {
    submit: "💣",
  },
  another: {},
};

test("returns correct submit string for english", () => {
  const string = stringsModule.getStringByLanguage("en", "submit", strings);

  expect(string).toBe(strings.en.submit);
});

test("returns correct submit string for emoji", () => {
  const string = stringsModule.getStringByLanguage("emoji", "submit", strings);

  expect(string).toBe(strings.emoji.submit);
});

test("returns english submit when language does not exist", () => {
  const string = stringsModule.getStringByLanguage(
    "notLenguage",
    "submit",
    strings
  );

  expect(string).toBe(strings.en.submit);
});

test("returns english submit when submit key does not exist", () => {
  const string = stringsModule.getStringByLanguage(
    "another",
    "submit",
    strings
  );

  expect(string).toBe(strings.en.submit);
});
