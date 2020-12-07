import * as React from "react";
import "./App.css";
import Input from "./components/Input";

function App() {
  return (
    <div data-test="app-container" className="my-4">
      <div className="container mx-auto border hover:shadow transition-shadow duration-300 ease">
        <div className="p-4">
          <Input secretWord="train" />
        </div>
      </div>
    </div>
  );
}

export default App;
