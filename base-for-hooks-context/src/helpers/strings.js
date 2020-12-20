import en from "../locales/en/main.json";

export function getStringByLanguage(strings = en, languageCode) {
  return strings[languageCode];
}
