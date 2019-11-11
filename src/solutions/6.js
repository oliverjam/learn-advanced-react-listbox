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

  function handleKeyDown(event) {
    if (!isOpen) return;
    switch (event.key) {
      case "ArrowDown":
        return setActiveIndex(oldIndex => (oldIndex + 1) % options.length);
      case "ArrowUp":
        return setActiveIndex(
          oldIndex => (oldIndex - 1 + options.length) % options.length
        );
      case "Escape":
        return setIsOpen(false);
      default:
        break;
    }
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
        onKeyDown={handleKeyDown}
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
