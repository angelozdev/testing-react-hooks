import * as React from "react";
import PropTypes from "prop-types";

// Testing
export const dataAttrs = {
  container: "input-container",
  form: "input-form",
  input: "input-box",
  button: "input-submit-button",
  spinner: "spinner",
};

// Component
function Input({ secretWord }) {
  // States
  const [currentGuessWord, setCurrentGuessWord] = React.useState("");

  // Methods
  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: update guessedWord
    // TODO: check against secretWord and update success
    setCurrentGuessWord("");
  };

  const handleChange = (e) => {
    setCurrentGuessWord(e.target.value);
  };

  return (
    <div data-test={dataAttrs.container}>
      <p>{secretWord}</p>
      <form
        data-test={dataAttrs.form}
        onSubmit={handleSubmit}
        className="text-center"
      >
        <input
          className="py-1 px-3 border outline-none focus:border-green-400"
          type="text"
          placeholder="Enter guess"
          data-test={dataAttrs.input}
          value={currentGuessWord}
          onChange={handleChange}
        />
        <button
          className="py-1 px-3 bg-green-400 text-white"
          type="submit"
          data-test={dataAttrs.button}
        >
          GUESS
        </button>
      </form>
    </div>
  );
}

// Prop Types
Input.propTypes = {
  secretWord: PropTypes.string.isRequired,
};

export default Input;
