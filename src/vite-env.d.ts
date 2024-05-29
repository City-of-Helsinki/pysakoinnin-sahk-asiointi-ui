/* eslint-disable @typescript-eslint/no-empty-interface */
/// <reference types="vite/client" />
import 'vitest';

// eslint-disable-next-line prettier/prettier
import type { AxeMatchers } from 'vitest-axe/matchers';

declare module 'vitest' {
  export interface Assertion extends AxeMatchers {}
  export interface AsymmetricMatchersContaining extends AxeMatchers {}
}
