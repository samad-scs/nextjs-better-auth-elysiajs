import globals from 'globals'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsparser from '@typescript-eslint/parser'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
})

export default [
  {
    ignores: ['eslint.config.mjs']
  },
  ...compat.extends('next/core-web-vitals', 'prettier'),
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser
      },
      ecmaVersion: 11,
      sourceType: 'module',

      parser: tsparser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaFeatures: {
          jsx: true,
          modules: true,
          experimentalObjectRestSpread: true
        }
      }
    },

    plugins: {
      '@typescript-eslint': tseslint
    },

    rules: {
      // turn off the JS rule completely (doesn't understand TS)
      'no-unused-vars': 'off',

      // enable the TS rule (respects type-only stuff)
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'after-used',
          argsIgnorePattern: '^_', // allow unused args if prefixed with _
          varsIgnorePattern: '^_', // allow unused vars if prefixed with _
          ignoreRestSiblings: true
        }
      ],

      'react/react-in-jsx-scope': 'off',
      'react/jsx-filename-extension': [
        2,
        {
          extensions: ['.js', '.jsx', '.ts', '.tsx']
        }
      ],
      'react/display-name': 'off',
      '@next/next/no-img-element': 'off',
      'react/no-unescaped-entities': 'off',
      'import/no-anonymous-default-export': 'off',

      'lines-around-comment': [
        'error',
        {
          beforeLineComment: true,
          beforeBlockComment: true,
          allowBlockStart: true,
          allowClassStart: true,
          allowObjectStart: true,
          allowArrayStart: true
        }
      ],
      'newline-before-return': 'error',
      'import/newline-after-import': ['error', { count: 1 }],
      'padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: ['export'],
          next: ['*']
        },
        {
          blankLine: 'always',
          prev: ['*'],
          next: ['multiline-const', 'multiline-let', 'multiline-var', 'export']
        }
      ]
    }
  }
]
