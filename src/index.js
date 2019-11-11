import React from "react";
import ReactDOM from "react-dom";
import "./global.css";
import "./listbox.css";
import Listbox from "./solutions/9";

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
  return <Listbox options={fruit} onChange={console.log} />;
}

ReactDOM.render(<App />, document.getElementById("root"));
