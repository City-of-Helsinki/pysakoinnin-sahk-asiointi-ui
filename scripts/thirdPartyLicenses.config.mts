import type { ThirdPartyLicensesConfig } from '@city-of-helsinki/license-notices';

/**
 * Everything about the third-party license notices that is specific to this
 * repository. The generator itself comes from the license-notices package and
 * knows nothing about this project.
 */
export const thirdPartyLicensesConfig: ThirdPartyLicensesConfig = {
  repositoryUrl:
    'https://github.com/City-of-Helsinki/pysakoinnin-sahk-asiointi-ui',

  licenseDecisions: {
    ibantools: {
      license: 'MIT',
      note:
        'Offered by its author under "MIT or MPL-2.0". This distribution ' +
        'elects MIT, so the MPL-2.0 obligations do not apply to this ' +
        'component.',
    },
  },

  // src/index.css inlines these with a CSS @import, which the bundler does
  // not see as modules, just as it does not see what Sass inlines.
  sassResolvedPackages: ['hds-core', 'hds-design-tokens'],
};
