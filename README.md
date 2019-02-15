# diadem-dapp-boilerplate

Decentralized application based on Diadem protocol.

## Develop (non-sandboxed version)

1 - `git clone git@github.com:DiademNetwork/qtum-dapp-client.git`  
2 - `cd qtum-dapp-client`  
3 - `yarn install`  
4 - Create a `.development.env` file (see `.env.example` for ex)
5 - `yarn start`  


## Develop (sandboxed version)

Sometimes (for example when working on design), you would prefer running in a sandboxed environment.
In the sandbox environment, external calls are mocked, and responses stubbed, so you dom't have to worry about another service being down or broken to work on application.

To start sandboxed app, after repository is cloned and dependencies installed:

1 - `yarn start:sandbox`  
2 - Go to `http://localhost:9000`

You will notice a sandbox settings button appearing on left of screen in application.
You can use it to switch mocks/stubs behaviour (For ex is user already registered?)

## Available scripts

* `cypress:open`: open cypress
* `start` : start a development version on `localhost:9000`, in watch mode
* `start:sandbox` : start a **sandboxed** development version on `localhost:9000`, in watch mode
* `start:sandbox:server` : start a **fake** server api version on `localhost:3001`, in watch mode
* `build`: build a development version in `dist` folder. Use `NODE_ENV` for desired env build
* `storybook`. Run storybook on port `6006`
* `lint` : run eslint for you project
* `test`: run `jest` tests and create a `coverage` directory (you can then open file `/coverage/lcov-report/index.html` to see nice coverage report)
* `test:cypress` run cypress test. `start:sandbox` should have been started before running this command.

## Testing

UNIT tests:
 - `yarn test` for JS files
 - `yarn storybook` + check components for components
ACCEPTANCE tests:
 - `yarn start:sandbox` + `yarn test:cypress`

Please always check tests before asking for a Pull Request Review.

## Configurables

### Networks

You can configure application to use any network supported. Networks supported are in `src/configurables/network/`

TO CHANGE network, you need to edit `src/configurables/network/index.js` to use the network you want before building application

TO ADD a network, you need to create a new folder for it in `src/configurables/network/`. Your logic will need to export an object like:

```javascript
{
  components: {
    LoginButton: React component
  },
  urls: {
    hashtag: String (url),
    website: String (url)
  },
  inputs: {
    link: {
      maxCaracters: Number,
      placeholder: String,
      isValid: Function taking ({previousLink) as parameter
    }
  },
  name: String,
  dataPaths: {
    userName: Array
    userAccessToken: Array
    userPictureUrl: Array
    userID: Array
  },
  texts: {
    linkHelp: String
  }
}
```

#### Facebook

You can configure application to use one social network you want.

Configured social networks:

- facebook

TIPS: to use facebook in development mode, you will need to:
1 - If it's the first time you develop on application add `127.0.0.1 local.diadem.network` in your `/etc/hosts` file  
2 - Go to `https://local.diadem.network:9000`
Indeed, facebook force using https