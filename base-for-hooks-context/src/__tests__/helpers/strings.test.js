import * as stringsModule from "../../helpers/strings";

// Mocks
const en = {
  congrats: "Congratulations! You guessed the word",
  submit: "Submit",
  guessedPrompt: "Try to guess th secret word!",
  guessInputPlaceholder: "Enter guess",
  loading: "Loading...",
};

test("returns correct submit string for english", () => {
  const string = stringsModule.getStringByLanguage(en, "submit");

  expect(string).toBe(en.submit);
});

test("returns english submit when language does not exists", () => {
  const string = stringsModule.getStringByLanguage(undefined, "submit");

  expect(string).toBe(en.submit);
});
