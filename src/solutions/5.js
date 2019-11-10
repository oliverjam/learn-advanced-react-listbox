import React from "react";

function Listbox({ options, label }) {
  const selected = options[0];

  const [isOpen, setIsOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);

  function toggleOpen() {
    setIsOpen(wasOpen => !wasOpen);
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
        default:
          break;
      }
    }
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, options.length]);

  return (
    <div className="lb">
      <div id="lb-label" class="lb__label">
        {label}
      </div>
      <button
        aria-haspopup="listbox"
        aria-labelledBy="lb-label"
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
            return (
              <li
                key={"item" + index}
                id={"item" + index}
                role="option"
                onMouseOver={() => setActiveIndex(index)}
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
