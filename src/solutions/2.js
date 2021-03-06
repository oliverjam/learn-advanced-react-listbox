import React from "react";

function Listbox({ options, label }) {
  const selected = options[0];
  return (
    <div className="lb">
      <div id="lb-label" className="lb__label">
        {label}
      </div>
      <button
        aria-haspopup="listbox"
        aria-labelledby="lb-label"
        className="lb__button"
      >
        {selected}
      </button>
      <ul role="listbox" className="lb__list">
        {options.map((item, index) => {
          return (
            <li key={"option" + index} role="option" className="lb__listItem">
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Listbox;
