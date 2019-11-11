import React from "react";

function Listbox({ options, label }) {
  const selected = options[0];

  const [isOpen, setIsOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const buttonRef = React.useRef();
  const listRef = React.useRef();

  function toggleOpen() {
    setIsOpen(wasOpen => !wasOpen);
  }

  React.useEffect(() => {
    if (isOpen) {
      listRef.current.focus();
    } else {
      buttonRef.current.focus();
    }
  }, [isOpen]);

  return (
    <div className="lb">
      <div id="lb-label" className="lb__label">
        {label}
      </div>
      <button
        aria-haspopup="listbox"
        aria-labelledby="lb-label"
        onClick={toggleOpen}
        ref={buttonRef}
        className="lb__button"
      >
        {selected}
      </button>
      <ul
        role="listbox"
        tabIndex="0"
        ref={listRef}
        aria-activedescendant={"option" + activeIndex}
        className="lb__list"
      >
        {isOpen &&
          options.map((item, index) => {
            const isActive = activeIndex === index;
            return (
              <li
                key={"option" + index}
                id={"option" + index}
                role="option"
                onMouseOver={() => setActiveIndex(index)}
                style={{ backgroundColor: isActive && "hsl(220, 20%, 94%)" }}
                className="lb__listItem"
              >
                {item}
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default Listbox;
