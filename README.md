PATH
====

Prototype website of a mobile app for a project in Human Computer Interaction class.

The website can be seen at http://fuzzley.info/project/path. Since the website is a prototype of a mobile app, it is best viewed on a mobile or tablet device.

The website is designed as a "Single Page App", utilizing [hasher](https://github.com/millermedeiros/hasher/) and [crossroads](https://millermedeiros.github.io/crossroads.js/).
The [Bootstrap](http://getbootstrap.com/) library is used for most of the styling.
[Knockout](http://knockoutjs.com/) is used for some of the functionality (like paging through the "Simple Manual" steps).

## Development

This project uses [yarn](https://yarnpkg.com/) for dependency management and
[Vite](https://vite.dev/) for the dev server and production build.

```sh
yarn install     # install dev dependencies
yarn dev         # start the dev server on http://localhost:9000
yarn build       # produce a production build in dist/
yarn preview     # serve the production build locally
yarn test        # run tests with Vitest
yarn lint        # run ESLint
yarn prettier    # format the code with Prettier
```