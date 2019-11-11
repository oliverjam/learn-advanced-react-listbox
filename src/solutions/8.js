import React from "react";

function Listbox({ options, label }) {
  const [selected, setSelected] = React.useState(options[0]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const buttonRef = React.useRef();
  const listRef = React.useRef();

  function toggleOpen() {
    setIsOpen(wasOpen => !wasOpen);
  }

  function handleSelect(item) {
    setIsOpen(false);
    setSelected(item);
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
      case "Enter":
        return handleSelect(options[activeIndex]);
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
        onBlur={() => setIsOpen(false)}
        className="lb__list"
      >
        {isOpen &&
          options.map((item, index) => {
            const isActive = activeIndex === index;
            const isSelected = selected === item;
            return (
              <li
                key={"option" + index}
                id={"option" + index}
                role="option"
                aria-selected={isSelected}
                onMouseOver={() => setActiveIndex(index)}
                onClick={() => handleSelect(item)}
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
