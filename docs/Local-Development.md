# Local development

## Step 1 - Inital configuration

1. Log into Getstream with your identifiants
2. Select (or copy if you want a fresh version) the app `diadem-sandbox`
3. Use this getstream app info to edit `./envs/.sandbox.env` values:
   1. Use `KEY` for `GETSTREAM_APP_KEY`
   2. Use `APP_ID` for `GETSTREAM_APP_ID`

## Step 2 - Start local sandbox server

1. Copy `SECRET` in getsream app
2. Run command: `export GETSTREAM_APP_SECRET=SECRET && yarn start:sandbox:server`
3. In console, you will get a `achievements_aggregated_common token` value given
4. Copy it and paste it in `./envs/.sandbox.env` for value `GETSTREAM_ACHIEVEMENT_COMMON_TOKEN`

## Step 3 - Start local client

1. Verify that in `./envs/.sandbox.env`, `BACKEND_URL` is set to `http://localhost:3001`
2. Run `yarn start:sandbox`
3. Go to `http://localhost:9000` with your browser


NOTE: If next time you use the same getstream app, you wont need to re-edit `./envs/.sandbox.env`.
You will only need to grab `GETSTREAM_APP_SECRET` from Getstream to start local server.

Happy development!