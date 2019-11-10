import React from "react";

function Listbox({ options }) {
  const selected = options[0];
  return (
    <div className="lb">
      <button aria-haspopup="listbox" className="lb__button">
        {selected}
      </button>
      <ul role="listbox" className="lb__list">
        {options.map((item, index) => {
          return (
            <li key={"item" + index} role="option" className="lb__listItem">
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Listbox;
