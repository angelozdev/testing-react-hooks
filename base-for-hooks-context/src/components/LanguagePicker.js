import * as React from "react";
import propTypes from "prop-types";

/* Test */
export const dataTestIds = {
  COMPONENT: "COMPONENT",
  LANGUAGE_ICON: "LANGUAGE_ICON",
};

/* Component */
function LanguagePicker({ setLanguage }) {
  const languages = [
    { code: "en", symbol: "🇺🇸" },
    { code: "emoji", symbol: "😃" },
  ];

  /* Methods */
  const handleClick = (lan) => {
    setLanguage(lan);
  };

  /* Views */
  const languagesIconsViews = languages.map((lan, index) => (
    <span
      className="cursor-pointer"
      onClick={() => handleClick(lan.code)}
      key={index}
      data-test={dataTestIds.LANGUAGE_ICON}
    >
      {lan.symbol}
    </span>
  ));

  return (
    <div className="border inline py-1 px-3" data-test={dataTestIds.COMPONENT}>
      {languagesIconsViews}
    </div>
  );
}

/* PropTypes */
LanguagePicker.propTypes = {
  setLanguage: propTypes.func.isRequired,
};

export default LanguagePicker;
