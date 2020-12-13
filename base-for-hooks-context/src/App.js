import * as React from "react";

// Components
import Input from "./components/Input";

// Hooks
import * as hooks from "./hooks/getSecretWord";

// Styles
import "./App.css";

// Reducer
const actionTypes = {
  SET_SECRET_WORD_REQUEST: "SET_SECRET_WORD_REQUEST",
  SET_SECRET_WORD_SUCCESS: "SET_SECRET_WORD_SUCCESS",
  SET_SECRET_WORD_FAILED: "SET_SECRET_WORD_FAILED",
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
        data: action.payload,
        status: statuses.SUCCESS,
      };
    case actionTypes.SET_SECRET_WORD_FAILED:
      return {
        ...state,
        status: statuses.FAILED,
        error: action.payload,
      };
    default:
      throw new Error(`Invalid action type ${action.type}`);
  }
}

// Component
function App() {
  // States
  const initialState = {
    data: null,
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
    <div data-test="app-container" className="my-4">
      <div className="container mx-auto border hover:shadow transition-shadow duration-300 ease">
        <div className="p-4">
          {state.status === statuses.FAILED && (
            <p>Error: {state.error?.message}</p>
          )}
          {state.status === statuses.LOADING && <p>Loading...</p>}

          {state.status === statuses.SUCCESS && (
            <Input secretWord={state.data} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
