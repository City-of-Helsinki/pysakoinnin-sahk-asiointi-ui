const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

module.exports = [
  {
    ignores: ['node_modules/**', 'build/**', 'coverage/**', 'reports/**', 'report/**', 'test-results/**']
  },
  ...compat.config({
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:react/recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react-hooks/recommended',
      'plugin:import/errors',
      'plugin:import/warnings',
      'plugin:import/typescript',
      'plugin:jsx-a11y/recommended',
      'plugin:vitest-globals/recommended',
      'plugin:prettier/recommended'
    ],
    plugins: ['react', '@typescript-eslint', 'prettier', 'import', 'sonarjs', 'jsx-a11y'],
    rules: {
      'react/prop-types': 0,
      'react/destructuring-assignment': 0,
      'react/static-property-placement': 0,
      'jsx-a11y/alt-text': 0,
      'react/jsx-props-no-spreading': 0,
      'no-unused-vars': 0,
      'no-magic-numbers': [
        'error',
        {
          ignoreArrayIndexes: true,
          ignore: [1000, -1, 0, 1, 2, 3, 4, 5]
        }
      ],
      'arrow-body-style': ['error', 'as-needed'],
      'line-comment-position': ['error', { position: 'above' }],
      'no-restricted-imports': ['error', { patterns: [' * as'] }],
      'arrow-parens': ['error', 'as-needed'],
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      '@typescript-eslint/no-unused-expressions': 0,
      'sonarjs/prefer-immediate-return': 'error',
      'sonarjs/no-duplicate-string': 'error',
      'import/no-namespace': 'error',
      'no-underscore-dangle': ['error', { allow: ['__typename', '_env_'] }],
      'import/no-named-as-default': 'off',
      'prettier/prettier': 'off'
    },
    settings: {
      react: {
        version: 'detect'
      },
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
          paths: ['src']
        }
      }
    },
    env: {
      browser: true,
      node: true,
      'vitest-globals/env': true
    },
    parserOptions: {
      project: './tsconfig.lint.json'
    }
  })
];
