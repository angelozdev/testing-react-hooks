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
  const handleClick = () => {
    setLanguage();
  };

  /* Views */
  const languagesIconsViews = languages.map((lan, index) => (
    <span key={index} data-test={dataTestIds.LANGUAGE_ICON}>
      {lan.symbol}
    </span>
  ));

  return (
    <div
      className="cursor-pointer border inline py-1 px-3"
      onClick={handleClick}
      data-test={dataTestIds.COMPONENT}
    >
      {languagesIconsViews}
    </div>
  );
}

/* PropTypes */
LanguagePicker.propTypes = {
  setLanguage: propTypes.func.isRequired,
};

export default LanguagePicker;
