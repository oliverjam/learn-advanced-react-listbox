# Learn Advanced React: Listbox

We're going to learn some more advanced React concepts whilst building an accessible listbox component. We'll be following the [ARIA guidelines](https://www.w3.org/TR/wai-aria-practices-1.1/#listbox), which specify what behaviour a listbox should have.

## Learning outcomes

1. Modelling complex interactions with React state
1. Following the ARIA spec and using ARIA attributes
1. Use the "compound component" pattern to create a more flexible component
1. Share internal component state with React context

## Listbox guidelines

A listbox is similar to an HTML `<select>`. We'll be reproducing as much of the native behaviour as possible. It is not advised to do this unless you really need custom behaviour or styling that the native element cannot support. We will proceed as a learning exercise :)

### Criteria

- [ ] I can see a button showing the first selected option
- [ ] When I click the button a popup appears showing all the options
  - The popup should be focused
- [ ] I can use the up and down arrow keys to highlight options in the popup
  - The highlighted option is communicated to assistive technologies using `aria-activedescendant`
- [ ] I can select an option with the return key, which should close the popup
- [ ] The newly selected option should show in the button
- [ ] I can close the popup with the escape key
  - The button should be focused

## Part One

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

## Part Two
