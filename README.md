# Welcome to Appspace React FE Challenge

You can use the Readme to document and explain your decisions.

### Explain here your decisions:

---

The app is using GraphQL for fetching data, I decided for this way compared to the normal end points calls, since it allows to me to have more flexibility rendering the UI, above all in detail pages where for example I would have needed to do `n` API calls in order to render characters for a particular episode or location. GraphQL is also caching data, so I don't need to store them in redux.
As it was requested, I didn't use any UI library, the only external component I used is `react-lazy-load-image-component`, since the API has a maximun limit of number of requests, this allows me show properly the characters images in the detail pages.
In the homepage we have `filters`, `sorting`, `searching` and `pagination`, once they are set, they are maintained through the all pages, in case we want to store them in the localStorage, it would be easily done just adding `PersistGate` and `persistStore`.
About the UI, I decided to use the `pagination` option in homepage instead that an infinite scrolling, since I think the results are more ordered and better readable by the user.
The images are preloaded, so that user can see them all together whithout experiment any delay on the UI rendering.
The app is fully covered by test using Jest and RTL.

It's possible to visit the app here:
[https://riccardoferranti.github.io/rick-morty-collection](`https://riccardoferranti.github.io/rick-morty-collection`)


## Available Scripts

In the project directory, you can run:

### `npm start`

### `npm test`

### `npm run build`

---

#### If you feel the need to extend the webpack config you can use this command.

### `npm run eject`
