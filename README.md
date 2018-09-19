# qtum-dapp-client

Client for Diadem Network application for Qtum Hackathon.

If you do not know what Diadem Netowkr is about, please [Check cocumentation](https://github.com/DiademNetwork/qtum-dapp-documentation)

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

## Develop (non-sandboxed version)

1 - `git clone git@github.com:DiademNetwork/qtum-dapp-client.git`  
2 - `cd qtum-dapp-client`  
3 - `yarn install`  
4 - Create a `.development.env` file (see `.env.example` for ex)
5 - `yarn start`  
6 - If it's the first time you develop on application add `127.0.0.1 local.diadem.network` in your `/etc/hosts` file  
7 - Go to `https://local.diadem.network:9000`

Note: The trick with `/etc/hosts` and `local.diadem.network` instead of `localhost` will make it possible to login with facebook.

## Develop (sandboxed version)

Sometimes (for example when working on design), you would prefer running in a sandboxed environment.
In the sandbox environment, external calls are mocked, and responses stubbed, so you dom't have to worry about another service being down or broken to work on application.

To start sandboxed app, after repository is cloned and dependencies installed:

1 - `yarn start:sandbox`  
2 - Go to `http://localhost:9000`

## Available scripts

* `start` : start a development version of your app on `localhost:9000`, in watch mode
* `build`: build a development version of you app in `dist` folder
* `build-production`: build an optimized version of your app in `dist` folder
* `lint` : run eslint for you project
* `test`: run `jest` tests and create a `coverage` directory (you can then open file `/coverage/lcov-report/index.html` to see nice coverage report

## TO DO (Technical)

- Handling technical debt which resulted from fast coding for Hackathon :
  - Separate components into smaller components
  - User redux-sagas instead of redux-thunk (and divide ugly actions/index.js in better/smaller chunks)
  - Cover app with unit/integration/acceptance tests
  - Separate repetitive UI component into their own component + make use of storybook
  - Add Typescript ? => TBD
  - CI Integration
  - Add mocked/stubbed scenarios (for ex failures) in sandbox env
  
