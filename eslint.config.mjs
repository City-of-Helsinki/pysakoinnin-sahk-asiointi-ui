import eslintReact from '@eslint-react/eslint-plugin';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import importX, { createNodeResolver } from 'eslint-plugin-import-x';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import sonarjs from 'eslint-plugin-sonarjs';
import globals from 'globals';

const reactFiles = ['**/*.{js,jsx,ts,tsx}'];

export default [
  { ignores: ['node_modules/**', 'build/**', 'coverage/**', 'reports/**', 'report/**', 'test-results/**'] },

  js.configs.recommended,
  ...tseslint.configs.recommended,
  { files: reactFiles, ...eslintReact.configs['recommended-typescript'] },
  reactHooks.configs.flat['recommended-latest'],
  { files: reactFiles, ...eslintReact.configs['disable-conflict-eslint-plugin-react-hooks'] },
  {
    files: reactFiles,
    rules: {
      '@eslint-react/exhaustive-deps': 'off',
      '@eslint-react/set-state-in-effect': 'off',
      '@eslint-react/no-array-index-key': 'off',
      '@eslint-react/no-context-provider': 'off',
    },
  },
  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,
  jsxA11y.flatConfigs.recommended,
  prettierRecommended,

  {
    plugins: { sonarjs },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.vitest,
      },
      parserOptions: {
        project: './tsconfig.lint.json',
      },
    },
    settings: {
      'import-x/resolver-next': [
        createNodeResolver({
          extensions: ['.ts', '.tsx', '.cts', '.mts', '.js', '.jsx', '.cjs', '.mjs'],
        }),
      ],
    },
    rules: {
      'jsx-a11y/alt-text': 0,
      'no-unused-vars': 0,
      'no-magic-numbers': [
        'error',
        {
          ignoreArrayIndexes: true,
          ignore: [1000, -1, 0, 1, 2, 3, 4, 5],
        },
      ],
      'arrow-body-style': ['error', 'as-needed'],
      'line-comment-position': ['error', { position: 'above' }],
      'arrow-parens': ['error', 'as-needed'],
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      '@typescript-eslint/no-unused-expressions': 0,
      'sonarjs/prefer-immediate-return': 'error',
      'sonarjs/no-duplicate-string': 'error',
      'import-x/no-namespace': 'error',
      'no-underscore-dangle': ['error', { allow: ['__typename', '_env_'] }],
      'import-x/no-named-as-default': 'off',
      'prettier/prettier': 'off',
    },
  },
];
