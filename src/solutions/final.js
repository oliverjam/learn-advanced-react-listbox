import React from "react";

function Listbox({ items, onChange }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [selected, setSelected] = React.useState(items[0]);

  const buttonRef = React.useRef();
  const listRef = React.useRef();

  function handleSelect(item) {
    if (!item) return;
    setSelected(item);
    close();
    if (onChange) onChange(item);
  }

  function toggle() {
    setIsOpen(wasOpen => !wasOpen);
  }

  function close() {
    setIsOpen(false);
  }

  function handleKeyDown(event) {
    switch (event.key) {
      case "ArrowDown":
        return setCurrentIndex(prev => (prev + 1) % items.length);
      case "ArrowUp":
        return setCurrentIndex(
          prev => (prev - 1 + items.length) % items.length
        );
      case "Escape":
        return close();
      case "Enter":
        return handleSelect(items[currentIndex]);
      default:
        return;
    }
  }

  React.useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  React.useEffect(() => {
    if (isOpen) {
      listRef.current.focus();
    } else {
      buttonRef.current.focus();
    }
  }, [isOpen]);

  return (
    <div className="lb">
      <div id="label" className="lb__label">
        Choose your fruit
      </div>
      <button
        className="lb__button"
        aria-labelledby="label"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={toggle}
        ref={buttonRef}
      >
        {selected}
        <span className="lb__icon" aria-hidden="true">
          {isOpen ? "▲" : "▼"}
        </span>
      </button>

      <ul
        role="listbox"
        id="suggestions"
        className="lb__list"
        aria-activedescendant={"item" + currentIndex}
        tabIndex="0"
        ref={listRef}
        onBlur={close}
        hidden={!isOpen}
      >
        {isOpen &&
          items.map((item, index) => {
            const isSelected = selected === item;
            const isHighlighted = currentIndex === index;
            return (
              <li
                key={"item" + index}
                id={"item" + index}
                onClick={() => handleSelect(item)}
                onMouseEnter={() => setCurrentIndex(index)}
                className="lb__listItem"
                role="option"
                aria-selected={isSelected}
                style={{
                  backgroundColor: isHighlighted && "hsl(220, 20%, 94%)",
                }}
              >
                {item}
                {isSelected && (
                  <span className="lb__icon" aria-hidden="true">
                    ✔︎
                  </span>
                )}
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default Listbox;
