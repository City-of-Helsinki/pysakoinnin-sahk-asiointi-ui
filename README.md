# Pysäköinnin asiointi React UI

React UI for Pysäköinnin Asiointi e-services

## Prerequisites

1. Node 24.14.1 (`nvm use`)
1. pnpm

## Running locally

### With hot reload

1. If you don't have pnpm installed, you can install it by running:
   npm install -g pnpm
2. Install dependencies by running the command `pnpm install`
3. Run app with default webpack server `pnpm start`
4. App runs on `localhost:3000`

### With Docker

1. Install Docker if you don't already have it
   - you can install Docker Desktop from [here](https://www.docker.com)
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
`pnpm update-runtime-env`. By default it's generated for development environment if no `NODE_ENV` is set.

To use local mock data instead of backend API calls, set `REACT_APP_USE_MOCK_DATA="true"` in `.env`.

Mock data is for local development only and must never be enabled in production.

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

### pnpm test

Runs tests in watch mode.

Scripts generates first environment variables to `public/test-env-config.js` with `scripts/update-runtime-env.ts`, which
contains the
actual used variables when running the app. App is not using CRA's default `process.env` way to refer of variables but
`window._env_` object.

### pnpm test-coverage

Runs tests with coverage outputted to console. Results are saved to /coverage Note: command is run with "CI=true".
Remove this to get visually clearer results (with colors!).

### yarn update-runtime-env

Generates variable object used when app is running. Generated object is stored at `public/env-config.js` and available
as `window._env_` object.

## Commit message format

New commit messages must adhere to the [Conventional Commits](https://www.conventionalcommits.org/)
specification, and line length is limited to 72 characters.

[`commitlint`](https://github.com/conventional-changelog/commitlint) checks new commit messages for the correct format.

## License

The source code in this repository is licensed under the MIT License; see
[LICENSE](./LICENSE). The licenses of the third-party code included in the
production build are listed in `third-party-licenses.txt`, which is generated
during the build and served from the root of the deployed application. The
same information is emitted alongside it as `oss-licenses.json`, for license
audit tooling.

The MIT License covers source code only. The following file is **not**
covered by it:

| File                 | Rights holder and terms                                                                                                                  |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `public/favicon.ico` | City of Helsinki. It shows the City of Helsinki logo, which is a registered trademark; it was added without any recorded source in 2020. |

[oidc-client-ts](https://github.com/authts/oidc-client-ts) (Apache-2.0) is
bundled through hds-react and is listed in the generated files. In addition,
[silent_renew.html](./public/silent_renew.html) loads a separate copy, version
2.2.2, from cdnjs with a subresource integrity hash. That copy does not appear
in the generated files and is not redistributed by this repository or by its
build output.

The Helsinki Grotesk typeface used by the user interface is proprietary and
licensed by Camelot Typefaces. No font files are stored in this repository;
they are loaded at runtime from a City of Helsinki service. See
[index.css](./src/index.css).
