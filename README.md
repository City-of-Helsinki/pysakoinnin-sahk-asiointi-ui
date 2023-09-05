# Pysäköinnin asiointi React UI

React UI for Pysäköinnin Asiointi e-services

## Running locally

### With hot reload

1. If you don't have Yarn installed, you can install it by following [these instructions](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)
2. Install dependencies by running the command `yarn install`
3. Run app with default webpack server `yarn start`
4. App runs on `localhost:3000`

### With Docker

1. Install Docker if you don't already have it
    - you can install [Docker Desktop](https://www.docker.com) from [here](https://www.docker.com)
2. start Docker Desktop in the background
3. run `docker-compose up` in terminal
4. App runs on `localhost:3000`

## Config

### Environment variables

Scripts generates first environment variables to `public/env-config.js` with `scripts/update-runtime-env.ts`, which
contains the
actual used variables when running the app. App is not using CRA's default `process.env` way to refer of variables but
`window._env_` object.

Note that running built application locally you need to generate also `public/env-config.js` file. It can be done with
`yarn update-runtime-env`. By default it's generated for development environment if no `NODE_ENV` is set.

### Adding Azure library variables

This requires the installation and setup
of [Azure CLI and azure-devops tools](https://learn.microsoft.com/en-us/azure/devops/cli/?view=azure-devops)

Running the script `./scripts/update-azure-vars.sh` will add Azure library variables for a given variable group by
passing a .env file

Command for adding Azure vars

`bash ./scripts/update-azure-vars.sh -g <GROUPID> -e <DOTENV FILE>`

where `-g` is a four digit Azure variable group ID and `-e` the path to the .env file you want to upload

You can find the variable group ID by running the command

`az pipelines variable-group list --group-name <GROUP-NAME> --query '[0].id'`

where `<GROUP-NAME>` is the Azure library name of the variable group in double quotes
e.g. `"pysakoinnin-sahk-asiointi-ui-development"`

this will return the four-digit identifier that you use in the update script.

If a given variable key already exists, the command will instead update the existing value.

## Testing

### yarn test

Runs tests in watch mode.

Scripts generates first environment variables to `public/test-env-config.js` with `scripts/update-runtime-env.ts`, which
contains the
actual used variables when running the app. App is not using CRA's default `process.env` way to refer of variables but
`window._env_` object.

### yarn test-coverage

Runs tests with coverage outputted to console. Results are saved to /coverage Note: command is run with "CI=true".
Remove this to get visually clearer results (with colors!).

### yarn test-coverage-for-sonar

Runs tests with coverage and its results are saved as an xml file by jest-sonar-reporter.
This file can be sent to Sonar with Sonar Scanner (CLI). Report is /reports

### yarn update-runtime-env

Generates variable object used when app is running. Generated object is stored at `public/env-config.js` and available
as `window._env_` object.

Generation uses `react-scripts` internals, so values come from either environment variables or files (according
[react-scripts documentation](https://create-react-app.dev/docs/adding-custom-environment-variables/#what-other-env-files-can-be-used))
.
