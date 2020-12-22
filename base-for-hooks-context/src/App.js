import * as React from "react";

// Components
import Input from "./components/Input";
import LanguagePicker from "./components/LanguagePicker";

// Hooks
import * as hooks from "./hooks/getSecretWord";

// Styles
import "./App.css";

// Reducer
const actionTypes = {
  SET_SECRET_WORD_REQUEST: "SET_SECRET_WORD_REQUEST",
  SET_SECRET_WORD_SUCCESS: "SET_SECRET_WORD_SUCCESS",
  SET_SECRET_WORD_FAILED: "SET_SECRET_WORD_FAILED",
  SET_LANGUAGE: "SET_LANGUAGE",
};

const statuses = {
  LOADING: "loading",
  IDLE: "idle",
  SUCCESS: "success",
  FAILED: "failed",
};

function reducer(state, action) {
  switch (action.type) {
    case actionTypes.SET_SECRET_WORD_REQUEST:
      return {
        ...state,
        status: statuses.LOADING,
      };
    case actionTypes.SET_SECRET_WORD_SUCCESS:
      return {
        ...state,
        data: { ...state.data, secretWord: action.payload },
        status: statuses.SUCCESS,
      };
    case actionTypes.SET_SECRET_WORD_FAILED:
      return {
        ...state,
        status: statuses.FAILED,
        error: action.payload,
      };
    case actionTypes.SET_LANGUAGE:
      return {
        ...state,
        data: {
          ...state.data,
          language: action.payload,
        },
      };
    default:
      throw new Error(`Invalid action type ${action.type}`);
  }
}

// Component
function App() {
  // States
  const initialState = {
    data: {
      secretWord: null,
      language: "en",
    },
    status: statuses.IDLE,
    error: null,
  };
  const [state, dispatch] = React.useReducer(reducer, initialState);

  // Methods
  const setSecretWord = (secretWord) => {
    dispatch({
      type: actionTypes.SET_SECRET_WORD_SUCCESS,
      payload: secretWord,
    });
  };

  const setLanguage = (language = "en") => {
    dispatch({ type: actionTypes.SET_LANGUAGE, payload: language });
  };

  // Lifecircle
  React.useEffect(() => {
    dispatch({ type: actionTypes.SET_SECRET_WORD_REQUEST });
    hooks
      .getSecretWord(setSecretWord)
      .then((data) => {
        dispatch({ type: actionTypes.SET_SECRET_WORD_SUCCESS, payload: data });
      })
      .catch((err) => {
        dispatch({ type: actionTypes.SET_SECRET_WORD_FAILED, payload: err });
      });
  }, []);

  console.log(state);

  return (
    <div data-test="app-container" className="m-4">
      <div className="container mx-auto border hover:shadow transition-shadow duration-300 ease">
        <div className="p-4">
          <h1 className="text-lg">Jooto Game</h1>
          <LanguagePicker setLanguage={setLanguage} />
          {state.status === statuses.FAILED && (
            <p data-test="error">{state.error?.message}</p>
          )}
          {state.status === statuses.LOADING && (
            <h3 data-test="spinner">Loading...</h3>
          )}
          {state.status === statuses.SUCCESS && state.data.secretWord && (
            <Input
              language={state.data.language}
              secretWord={state.data.secretWord}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
