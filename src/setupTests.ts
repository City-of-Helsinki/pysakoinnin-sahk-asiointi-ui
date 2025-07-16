import createFetchMock from 'vitest-fetch-mock';

import '@testing-library/jest-dom/vitest';
import 'vitest-axe/extend-expect';
import 'vitest-canvas-mock';
import './utils/i18n';
// eslint-disable-next-line import/no-namespace
import * as matchers from 'vitest-axe/matchers';

import { expect, vi } from 'vitest';
expect.extend(matchers);

// Set up React 18 test environment
// TypeScript declaration for IS_REACT_ACT_ENVIRONMENT
declare global {
  /* eslint-disable no-var */
  var IS_REACT_ACT_ENVIRONMENT: boolean;
}

// Set IS_REACT_ACT_ENVIRONMENT for React 18
global.IS_REACT_ACT_ENVIRONMENT = true;

// Mock window.getComputedStyle for jsdom
if (typeof window !== 'undefined') {
  // Store the original function
  const originalGetComputedStyle = window.getComputedStyle;

  // Create a complete mock for CSSStyleDeclaration
  const createMockCSSStyleDeclaration = (): CSSStyleDeclaration => {
    // Create a base div to extract CSS property names
    const div = document.createElement('div');
    const baseStyle = originalGetComputedStyle(div);

    // Create a mock object with all properties from a real CSSStyleDeclaration
    const mockStyle = {} as Record<string, string>;

    // Copy all property values
    for (let i = 0; i < baseStyle.length; i++) {
      const prop = baseStyle[i];
      mockStyle[prop] = '';
    }

    // Add necessary methods and properties
    return ({
      ...mockStyle,
      getPropertyValue: () => '',
      getPropertyPriority: () => '',
      setProperty: () => undefined,
      removeProperty: () => '',
      item: () => '',
      length: baseStyle.length,
      parentRule: null,
      cssText: '',
      cssFloat: '',
      [Symbol.iterator]: function*() {
        yield* Object.keys(mockStyle);
      }
    } as unknown) as CSSStyleDeclaration;
  };

  // Replace the original function with our mock
  window.getComputedStyle = (
    element: Element,
    pseudoElt?: string | null
  ): CSSStyleDeclaration => {
    try {
      if (pseudoElt) {
        // For pseudo-elements, return our complete mock
        return createMockCSSStyleDeclaration();
      }
      // For regular elements, try the original implementation
      return originalGetComputedStyle(element);
    } catch (e) {
      // If anything fails, return our mock
      return createMockCSSStyleDeclaration();
    }
  };
}

// Load generated runtime configuration to be available in tests
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('../public/test-env-config');

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();
