import { UserConfig, defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from '@nabla/vite-plugin-eslint';
import { thirdPartyLicenses } from '@city-of-helsinki/license-notices';

import { thirdPartyLicensesConfig } from './scripts/thirdPartyLicenses.config.mts';

export default defineConfig({
  base: '/',
  envPrefix: 'REACT_APP_',
  plugins: [
    react(),
    {
      ...eslint(),
      apply: 'serve'
    },
    thirdPartyLicenses(thirdPartyLicensesConfig),
  ] as UserConfig['plugins'],
  build: {
    outDir: './build',
    emptyOutDir: true,
    sourcemap: true,
  },
  server: {
    host: true,
    port: 3000
  },
  preview: {
    port: 3000
  }
});
