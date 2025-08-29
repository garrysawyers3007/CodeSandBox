React Typewriter App

This is a React application that fetches a hidden text string from a URL and displays it with a typewriter animation. The app is built using only native browser APIs and React hooks, without any external libraries.

## Features

* **Data Fetching:** Makes a network request to a specified URL using the `fetch` API.

* **Loading State:** Displays a "Loading..." message while waiting for the data to be fetched.

* **Typewriter Animation:** Reveals the fetched text character by character with a half-second delay between each.

* **Dynamic Rendering:** Renders the animated text as a list of characters (`<li>` elements).

***

## How it Works

The application is structured into a single `App` component that manages its state using React hooks.

1.  **Fetching Data (`useEffect`):** On component mount, a `useEffect` hook triggers an asynchronous `fetch` request to the URL. It uses `DOMParser` to parse the incoming HTML and extract the text from the `<body>` element.

2.  **Animation (`useEffect`):** A second `useEffect` hook watches for changes in the `fullText` state. Once the text is available, it starts a recursive `setTimeout` loop that adds one character to the `charArray` state every 500 milliseconds.

3.  **Rendering:** The component's render function conditionally displays a loading message or an unordered list (`<ul>`). It uses the `.map()` function to iterate over the `charArray` and render each character as a list item, creating the typewriter effect in real-time.

***
