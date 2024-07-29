import {
  UserConfig,
  defineConfig,
  configDefaults,
  coverageConfigDefaults
} from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  base: '/',
  envPrefix: 'REACT_APP_',
  plugins: [react(), eslint()] as UserConfig['plugins'],
  build: {
    outDir: './build',
    emptyOutDir: true
  },
  server: {
    host: true,
    port: 3000
  },
  preview: {
    port: 3000
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    exclude: [...configDefaults.exclude],
    reporters: ['verbose'],
    coverage: {
      reporter: ['clover', 'json', 'lcov', 'text'],
      include: ['src/**/*'],
      exclude: [...coverageConfigDefaults.exclude],
      provider: 'istanbul'
    },
    testTimeout: 10000
  }
});
