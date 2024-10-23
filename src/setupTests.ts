import createFetchMock from 'vitest-fetch-mock';
import { AnyFunction } from './common';
import '@testing-library/jest-dom/vitest';
import 'vitest-axe/extend-expect';
import './utils/i18n';
// eslint-disable-next-line import/no-namespace
import * as matchers from 'vitest-axe/matchers';

import { expect, vi } from 'vitest';
expect.extend(matchers);

// Load generated runtime configuration to be available in tests
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('../public/test-env-config');

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

vi.mock('react-router', async importActual => {
  const mod = await importActual();

  return {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: expected ts type error
    ...mod,
    useHistory: (): Record<string, AnyFunction> => ({
      push: vi.fn()
    })
  };
});

HTMLCanvasElement.prototype.getContext = () => null;
