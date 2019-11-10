import React from "react";
import ReactDOM from "react-dom";
import "./global.css";
import "./listbox.css";
import Listbox from "./solutions/3";

const fruit = [
  "apple",
  "apricot",
  "banana",
  "kumquat",
  "orange",
  "blackberry",
  "strawberry",
  "dragonfruit",
  "durian",
];

function App() {
  return <Listbox options={fruit} label="Choose your fruit" />;
}

ReactDOM.render(<App />, document.getElementById("root"));
