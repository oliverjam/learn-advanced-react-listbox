# Learn Advanced React: Listbox

We're going to learn some more advanced React concepts whilst building an accessible listbox component. We'll be following the [ARIA guidelines](https://www.w3.org/TR/wai-aria-practices-1.1/#listbox), which specify what behaviour a listbox should have.

![](/screenshots/6.gif)

## Learning outcomes

1. Modelling complex interactions with React state
1. Following the ARIA spec and using ARIA attributes
1. Managing DOM focus with React refs

## Listbox guidelines

A listbox is similar to an HTML `<select>`. We'll be reproducing as much of the native behaviour as possible. It is not advised to do this unless you really need custom behaviour or styling that the native element cannot support. We will proceed as a learning exercise :)

### Criteria

- [ ] I can see a button showing the first selected option
- [ ] When I click the button a popup appears showing all the options
  - The popup should be focused
- [ ] I can use the up and down arrow keys to highlight options in the popup
  - The highlighted option is communicated to assistive technologies using `aria-activedescendant`
- [ ] I can select an option with the enter key, which should close the popup
- [ ] The newly selected option should show in the button
- [ ] I can close the popup with the escape key
  - The button should be focused

## Part 0: setup

1. Clone this repo
1. `cd` into it and run `npm install`
1. Run `npm start` and it should automatically open in your browser

## Part 1: initial HTML structure

We'll start by defining our component API. For now lets keep it simple and say that we want a `Listbox` component that takes an array of `options` to render.

We should be able to use our component like this:

```jsx
<Listbox options={["apple", "orange", "banana"]} />
```

Open `src/index.js` and you should see that we're importing and rendering a `Listbox` component just like that. Open `src/Listbox.js` to start implementing this. We'll focus on our static markup before adding any state or event handlers.

### The markup

Our markup should contain a button, followed by a list with the `listbox` role. A `listbox` must contain children with the `option` role. We want an `option` for each item in our `options` array prop.

The rendered HTML should look something like this:

```html
<div class="lb">
  <button aria-haspopup="listbox" class="lb__button">
    apple
  </button>
  <ul role="listbox" class="lb__list">
    <li role="option" class="lb__listItem">
      apple
    </li>
    <li role="option" class="lb__listItem">
      orange
    </li>
    <li role="option" class="lb__listItem">
      banana
    </li>
  </ul>
</div>
```

### Task

Edit `src/Listbox.js` to take an `options` prop and render markup like the above. The BEM classes will add some styles (from `src/listbox.css`).

You should see something like this when you're done:

![](/screenshots/1.png)

## Part 2: labelling the button

Our button needs a label. Right now a user has no idea what to do with this UI element, as the button's text content is just the selected item.

### Task

Add a `label` prop to your component. We need to render this string inside a `<div>` element above the button. We can then associate it with the button using `aria-labelledBy`.

Don't forget to edit `src/index.js` to pass a `label` prop to your component.

![](/screenshots/2.png)

## Part 3: toggling the popup

Our `listbox` should be a popup that only appears when the user clicks the button. We'll need some React state to keep track of whether it's open or closed. We should also communicate whether the popup is open or not using the `aria-expanded` attribute on the button.

**Note**: since our button has declared that it has a listbox popup (with `aria-haspopup="listbox"`) the `listbox` must always be in the DOM. We can conditionally render its children.

### Task

Edit your component so that the options appear and disappear when the button is clicked.

![](/screenshots/3.gif)

## Part 4: managing focus

We need to ensure that focus moves onto the listbox when it is open, and moves back to the button when it is closed. This will ensure assistive technology users always know where they are.

### Refs and the DOM

We will use the `.focus()` method on the DOM elements to programmatically focus them. To do this we'll need access to the DOM nodes themselves.

You _could_ use `document.querySelector` to access them, but that isn't very "Reacty". It would tie your logic to the DOM structure (e.g. it would break if the selector didn't match). Since we're _creating_ the elements in JSX it would be nice if we also had a way to access the underlying DOM node.

Luckily React gives us a way to do this: the `ref`. This is a special property you can set on a JSX element that binds the underlying DOM node to a variable.

We pair this with the [`useRef`](https://reactjs.org/docs/hooks-reference.html#useref) hook. This creates a "bucket" for us to store mutable values in. It will keep track of our ref and let us access it via the `.current` property:

```jsx
function Test() {
  const buttonRef = React.useRef();
  console.log(buttonRef.current); // logs the button DOM node
  return <button ref={buttonRef}>Click</button>;
}
```

### Task

Use refs to get references to the button and listbox DOM nodes. Ensure the listbox is focused when it is open and the button is focused when it is closed. Don't forget that `<ul>`s aren't normally focusable, you'll need to make it so.

<details>
<summary>Click for a hint:</summary>

It's helpful to think of `useEffect` as a way to synchronise side-effects (like DOM manipulation) with your props/state. You can use it to focus the right DOM nodes as your state updates.

You can focus a DOM node you have a ref to with `nodeRef.current.focus()`.

</details>

![](/screenshots/4.gif)

## Part 5: highlighting an option

We need to be able to highlight options within the listbox. This should work with both the keyboard and mouse. We'll focus on just the mouse for now.

We'll need to keep track of the current index in state so we know which option is active.

### Task

Add an `onMouseOver` event handler to each option that updates the current active index in state. The active option should be communicated to the browser with the [`aria-activedescendant`](https://www.w3.org/TR/wai-aria/#aria-activedescendant) attribute on the listbox element. This should be set to the ID of the active option element. The active element should also have a different background colour for visual users.

![](/screenshots/5.gif)

## Part 6: keyboard control

Lots of users don't or can't use a mouse. So we should also implement keyboard controls for highlighting an option.

### Task

Add a `keyDown` event handler to the listbox element. This should increment the active index on `ArrowDown`, decrement it on `ArrowUp` and close the popup on `Escape`. It shouldn't do anything if the popup is closed.

<details>
<summary>Click for a hint:</summary>

You can use `(oldIndex + 1) % options.length)` to loop from 0 through the end of the array and back to 0.
You can use `(oldIndex - 1 + options.length) % options.length` to loop backwards through the indexes.

</details>

![](/screenshots/6.gif)

## Part 7: selecting an option

We need to be able to select an option and update the value shown in the button. This should also set the `aria-selected` property on the selected option.

### Task

Create some React state to track the selected option. It should default to the first thing in the `options` array.

An option can be selected either by clicking on it _or_ pressing the enter key when an option is active. The popup should close when a selection happens.

![](/screenshots/7.gif)

## Part 8: click anywhere to close

We've got a very functional listbox implementation now. There's one more nice feature we could add to help users: clicking outside the listbox should close it.

Since the listbox is always focused when open we don't have to mess around putting click handlers on the window. We can use an `onBlur` handler on the listbox that will fire when it loses focus (when the user tabs/clicks somewhere else).

### Task

Make sure the listbox closes when the user clicks outside of it.

![](/screenshots/7.gif)

## Part 9: `onChange` handler

Our component works, but its state is all internal. The rest of our application has no way to find out what choice a user has made.

Let's mirror the native API of form inputs and add an `onChange` prop that we'll call with the updated value whenever the user selects an option. That way a parent component can subscribe to updates and use them like this:

```jsx
<Listbox
  options={["apple", "orange", "banana"]}
  label="Choose your fruit"
  onChange={selected => console.log(selected)}
/>
```

### Task

Pass an `onChange` function as a prop in `src/index.js`. Edit your component to call this function with the selected option whenever the user makes a choice.

![](/screenshots/4.gif)

## Bonus stuff

It would be nice to have a visual indicator inside the button to show that is is exandable (and whether it is expanded). Usually a chevron (triangle) is used to communicate this.

You could also add something to indicate which option is selected (some browsers use a checkmark).

Note that in both cases we are communicating _visually_ what is already being communicated to the browser and assistive technologies with `aria-expanded` and `aria-selected`.
