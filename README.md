# Pysäköinnin sähköinen asiointi React UI

## Config

Configs are in .env -files. Default endpoint for Helsinki-Profiili is Tunnistamo. For Suomi.fi authentication, it is
plain Keycloak.

Tunnistamo does not support silent login checks (it uses only sessionStorage) so REACT_APP_OIDC_AUTO_SIGN_IN must be '
false'. It renews access tokens so REACT_APP_OIDC_SILENT_AUTH_PATH must be changed to '/' to prevent errors for unknown
redirect url.

Config can also be overridden for command line:

```bash
REACT_APP_OIDC_URL=https://foo.bar yarn start
```

### Environment variables

Scripts generates first environment variables to `public/env-config.js` with `scripts/update-runtime-env.ts`, which
contains the
actual used variables when running the app. App is not using CRA's default `process.env` way to refer of variables but
`window._env_` object.

Note that running built application locally you need to generate also `public/env-config.js` file. It can be done with
`yarn update-runtime-env`. By default it's generated for development environment if no `NODE_ENV` is set.

### Uploading and Updating Azure library variables

This requires the installation and setup
of [Azure CLI and azure-devops tools](https://learn.microsoft.com/en-us/azure/devops/cli/?view=azure-devops)

Running the script `./scripts/update-azure-vars.sh` will add Azure library variables for a given variable group by
passing a .env file

Command for uploading Azure vars

`bash ./scripts/update-azure-vars.sh -g <GROUPID> -e <DOTENV FILE>`

where `-g` is a four digit Azure variable group ID and `-e` the path to the .env file you want to upload

You can find the variable group ID by running the command

`az pipelines variable-group list --group-name <GROUP-NAME> --query '[0].id'`

where `<GROUP-NAME>` is the Azure library name of the variable group in double quotes
e.g. `"pysakoinnin-sahk-asiointi-ui-development"`

this will return the four-digit identifier that you use in the update script

### Config for Helsinki-Profiili MVP

Settings when using Helsinki-Profiili MVP authentication:

```bash
REACT_APP_OIDC_URL="<SERVER_URL>/auth"
REACT_APP_OIDC_REALM="helsinki-tunnistus"
REACT_APP_OIDC_SCOPE="profile"
REACT_APP_OIDC_CLIENT_ID="exampleapp-ui"
```

## Docker

Docker image has ".env"-file baked in, so it uses production environment variables by default. To make the image work in
other environments, env vars must be overridden.

You can pass new env vars easily with '--env-file' argument. Of course '-e' works too.

### Docker run

```
docker run --env-file=.env.development -p 3000:8080 helsinki/example-ui-profile
```

### Docker compose

Note that the composed build will stop to the 'development' stage in Dockerfile and uses 'react-scripts start' command
and not nginx.

The env-file is fixed to '.env.development" in the 'docker-compose.yml'.

```
docker compose up
```

Env vars can be overridden in the yaml-file.

Example:

```yml
services:
  app:
    environment:
      - REACT_APP_OIDC_URL=https://foo.bar
```

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
