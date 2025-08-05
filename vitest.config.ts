import { defineConfig, configDefaults, coverageConfigDefaults } from 'vitest/config';
import viteConfig from './vite.config';
import { mergeConfig } from 'vite';

export default mergeConfig(
  viteConfig,
  defineConfig({
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
        provider: 'istanbul',
      },
      testTimeout: 10000,
    },
  })
);
