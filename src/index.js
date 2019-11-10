import React from "react";
import ReactDOM from "react-dom";
import "./global.css";
import "./listbox.css";
import Combobox from "./solutions/final";

const fruit = [
  "apple",
  "apricot",
  "banana",
  "kumquat",
  "orange",
  "kiwi",
  "blackberry",
  "blueberry",
  "strawberry",
  "dragonfruitnjadfknmfadnjkdsfnjks",
  "durian",
];

function App() {
  return <Combobox items={fruit} onChange={item => console.log(item)} />;
}

ReactDOM.render(<App />, document.getElementById("root"));
