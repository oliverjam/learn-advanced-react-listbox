import React from "react";

function Listbox({ options, label }) {
  const selected = options[0];

  const [isOpen, setIsOpen] = React.useState(false);

  function toggleOpen() {
    setIsOpen(wasOpen => !wasOpen);
  }

  return (
    <div className="lb">
      <div id="lb-label" className="lb__label">
        {label}
      </div>
      <button
        aria-haspopup="listbox"
        aria-labelledby="lb-label"
        onClick={toggleOpen}
        className="lb__button"
      >
        {selected}
      </button>
      <ul role="listbox" className="lb__list">
        {isOpen &&
          options.map((item, index) => {
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
