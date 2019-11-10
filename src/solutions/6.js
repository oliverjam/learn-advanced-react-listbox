import React from "react";

function Listbox({ options, label }) {
  const [selected, setSelected] = React.useState(options[0]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);

  function toggleOpen() {
    setIsOpen(wasOpen => !wasOpen);
  }

  function handleSelect(item) {
    setIsOpen(false);
    setSelected(item);
  }

  React.useEffect(() => {
    function handleKeyDown(event) {
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
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, options, activeIndex]);

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
      <ul
        role="listbox"
        className="lb__list"
        aria-activedescendant={"option" + activeIndex}
      >
        {isOpen &&
          options.map((item, index) => {
            const isActive = activeIndex === index;
            const isSelected = selected === item;
            return (
              <li
                key={"item" + index}
                id={"item" + index}
                role="option"
                aria-selected={isSelected}
                onMouseOver={() => setActiveIndex(index)}
                onClick={() => handleSelect(item)}
                className="lb__listItem"
                style={{ backgroundColor: isActive && "hsl(220, 20%, 94%)" }}
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
