# diadem-network-client

A client for diadem-network project for Qtum Hackathon.

## Techs used

* React 16
* Redux
* Material-UI
* Qtumjs-wallet
* Qtumjs
* Getstream
* Webpack 3
* Babel
* Eslint (Standard config)
* Jest/Enzyme (TO DO)
* Storybook 3 (TO DO)

## Develop

1 - `git clone git@github.com:DiademNetwork/qtum-dapp-client.git`  
2 - `cd qtum-dapp-client`  
3 - `yarn install`  
4 - Create a `.env` file (see `.env.example`)
5 - `yarn start`
6 - Go to `localhost:9000`

## Available scripts

* `start` : start a development version of your app on `localhost:9000`, in watch mode
* `build`: build a development version of you app in `dist` folder
* `build-production`: build an optimized version of your app in `dist` folder
* `lint` : run eslint for you project
* `test`: run `jest` tests and create a `coverage` directory (you can then open file `/coverage/lcov-report/index.html` to see nice coverage report

## TO DO (Technical)

- Handling technical debt which resulted from fast coding for Hackathon :
  - Separate components into smaller components
  - User redux-sagas instead of redux-thunk
  - Cover app with unit/integration/acceptance tests