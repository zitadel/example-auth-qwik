import js from '@eslint/js';
import ts from 'typescript-eslint';
import { qwikEslint9Plugin } from 'eslint-plugin-qwik';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default ts.config(
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      'coverage/**',
      'server/**',
    ],
  },
  js.configs.recommended,
  ...ts.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: ts.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        projectService: {
          allowDefaultProject: [
            'knip.config.js',
            'prettier.config.mjs',
            'commitlint.config.js',
            'eslint.config.mjs',
            'test/app.spec.ts',
          ],
        },
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
        ...globals.serviceworker,
      },
    },
  },
  {
    files: ['**/*.{js,mjs}'],
    languageOptions: {
      globals: { ...globals.node, ...globals.es2021 },
    },
  },
  {
    files: ['**/*.{test,spec}.{ts,tsx,js,mjs}', 'test/**/*.{ts,tsx,js,mjs}'],
    languageOptions: { globals: { ...globals.jest, ...globals.node } },
  },
  // qwik plugin rules need TS type info — restrict to TS files so they
  // don't try to type-check the config file itself.
  ...qwikEslint9Plugin.configs.recommended.map((c) => ({
    ...c,
    files: ['**/*.{ts,tsx}'],
  })),
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      // Pre-existing override: qwik examples use `any` deliberately.
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  prettier,
);
