import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import importPlugin from 'eslint-plugin-import';
import boundaries from 'eslint-plugin-boundaries';

const LAYERS = ['app', 'pages', 'widgets', 'features', 'entities', 'shared'];

const below = (layer) => {
  const index = LAYERS.indexOf(layer);
  return LAYERS.slice(index);
};

export default tseslint.config(
  {
    ignores: ['dist/**', 'frontend/dist/**', 'node_modules/**', 'html/**'],
  },

  js.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,

  {
    files: ['**/*.{js,mjs,cjs}'],
    extends: [tseslint.configs.disableTypeChecked],
    languageOptions: { globals: globals.node },
    rules: { 'import/no-default-export': 'off' },
  },

  {
    files: ['frontend/public/**/*.js', 'scripts/film/scene.mjs'],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ['scripts/film/render.mjs'],
    languageOptions: { globals: { window: 'readonly' } },
  },

  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2023,
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      import: importPlugin,
      boundaries,
    },
    settings: {
      'boundaries/include': ['frontend/src/**/*'],
      'boundaries/ignore': ['frontend/src/main.tsx'],
      'boundaries/elements': [
        { type: 'app', pattern: 'frontend/src/app/**' },
        { type: 'pages', pattern: 'frontend/src/pages/**' },
        { type: 'widgets', pattern: 'frontend/src/widgets/**' },
        { type: 'features', pattern: 'frontend/src/features/**' },
        { type: 'entities', pattern: 'frontend/src/entities/**' },
        { type: 'shared', pattern: 'frontend/src/shared/**' },
      ],
      'import/resolver': {
        typescript: { alwaysTryTypes: true },
        node: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      '@typescript-eslint/no-explicit-any': 'error',

      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/ban-ts-comment': [
        'error',
        { 'ts-ignore': true, 'ts-expect-error': 'allow-with-description', 'ts-nocheck': true },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],

      'import/no-default-export': 'error',

      'boundaries/dependencies': [
        'error',
        {
          default: 'disallow',
          message:
            '{{from.element.type}} may not import {{to.element.type}}. Imports flow downward only: app -> pages -> widgets -> features -> entities -> shared.',
          policies: [
            ...LAYERS.map((layer) => ({
              from: { element: { type: layer } },
              allow: { to: { element: { types: { anyOf: below(layer) } } } },
            })),
          ],
        },
      ],
      'boundaries/no-unknown': 'off',
      'boundaries/no-private': 'off',
    },
  },

  {
    files: ['frontend/src/main.tsx'],
    rules: { 'import/no-default-export': 'off' },
  },

  {
    files: ['*.config.{js,ts}'],
    languageOptions: { globals: globals.node },
    rules: {
      'import/no-default-export': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
    },
  },
);
