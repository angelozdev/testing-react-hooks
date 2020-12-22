const languageStrings = {
  en: {
    congrats: "Congratulations! You guessed the world!",
    submit: "Submit",
    guessedPrompt: "Try to guess the secret word!",
    guessedInputPlaceholder: "Enter guess",
    guessColumnHeader: "Guessed Words",
    guessedWords: "Guessed",
    matchingLetterColumnHeader: "Matching Letters",
  },
  emoji: {
    congrats: "✔️✨",
    submit: "💣",
    guessedPrompt: "🤔🔤",
    guessedInputPlaceholder: "⌨️💡",
    guessColumnHeader: "Guessed Words",
    guessedWords: "Guessed",
    matchingLetterColumnHeader: "✔️",
  },
};

export function getStringByLanguage(
  languageCode = "en",
  stringKey,
  strings = languageStrings
) {
  if (!strings[languageCode] || !strings[languageCode][stringKey]) {
    return strings.en[stringKey];
  }
  return strings[languageCode][stringKey];
}
