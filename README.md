# Welcome to Appspace React FE Challenge

You can use the Readme to document and explain your decisions.

### Explain here your decisions:

---

The app is using GraphQL for fetching data, I decided for this way compared to the normal end points calls, since it allows to me to have more flexibility rendering the UI, above all in detail pages where for example I would have needed to do `n` API calls in order to render characters for a particular episode or location. GraphQL is also caching data, so I don't need to store them in redux.\
As it was requested, I didn't use any UI library, the only external component I used is `react-lazy-load-image-component`, since the API has a maximun limit of number of requests, this allows me show properly the characters images in the detail pages.\
In the homepage we have `filters`, `sorting`, `searching` and `pagination`, once they are set, they are maintained through the all pages, in case we want to store them in the localStorage, it would be easily done just adding `PersistGate` and `persistStore`.\
About the UI, I decided to use the `pagination` option in homepage instead that an infinite scrolling, since I think the results are more ordered and better readable by the user.\
The images are preloaded, so that user can see them all together whithout experiment any delay on the UI rendering.\
One last consideration is about the url, I was using the react router state to pass the id to the details page, in order to make the url more meangful, so insteatd to have `character/1`, the url was `character/rick-sanchez`, but for some reason github pages is not keeping the state when the page is refreshed, that's why I passed the id in the url.\
The app is fully covered by test using Jest and RTL.

It's possible to visit the app here: [rick-morty-collection](https://riccardoferranti.github.io/rick-morty-collection)

## Available Scripts

In the project directory, you can run:

### `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.

### `npm test`
Launches the test runner in the interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

---

#### If you feel the need to extend the webpack config you can use this command.

### `npm run eject`
**Note: this is a one-way operation. Once you `eject`, you can’t go back!**
