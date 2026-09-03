import js from '@eslint/js';
import jsdoc from 'eslint-plugin-jsdoc';
import perfectionist from 'eslint-plugin-perfectionist';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['dist/**', 'coverage/**', 'node_modules/**', '*.config.ts', '*.config.mjs'],
  },

  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,

  {
    files: ['src/**/*.ts'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: { jsdoc, perfectionist },
    rules: {
      /* --- Ordering: alphabetical everywhere, auto-fixed --- */
      'perfectionist/sort-classes': [
        'error',
        {
          groups: [
            'index-signature',
            'static-property',
            'private-property',
            'protected-property',
            'property',
            'constructor',
            'private-method',
            'protected-method',
            'method',
          ],
          order: 'asc',
          type: 'alphabetical',
        },
      ],
      'perfectionist/sort-imports': ['error', { order: 'asc', type: 'alphabetical' }],
      'perfectionist/sort-named-imports': ['error', { order: 'asc', type: 'alphabetical' }],

      /* --- Naming: underscore required on private, forbidden elsewhere --- */
      '@typescript-eslint/naming-convention': [
        'error',
        { format: ['camelCase'], leadingUnderscore: 'require', modifiers: ['private'], selector: 'memberLike' },
        { format: ['camelCase'], leadingUnderscore: 'forbid', modifiers: ['protected'], selector: 'memberLike' },
        { format: ['camelCase'], leadingUnderscore: 'forbid', modifiers: ['public'], selector: 'memberLike' },
        { format: ['PascalCase'], selector: 'typeLike' },
        { format: ['UPPER_CASE'], selector: 'enumMember' },
      ],

      /* --- Type safety --- */
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: false }],
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/switch-exhaustiveness-check': 'error',

      /* --- Modern syntax --- */
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/prefer-readonly': 'error',
      'no-prototype-builtins': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-object-spread': 'error',

      /* GATED: enabling this autofixes ~180 `||` sites and changes ResponseOptions behaviour.
         Turn on only after the characterisation tests and the coercion fix land. */
      '@typescript-eslint/prefer-nullish-coalescing': 'off',

      /* --- Documentation --- */
      'jsdoc/require-jsdoc': [
        'warn',
        {
          contexts: ['TSInterfaceDeclaration', 'TSTypeAliasDeclaration', 'TSEnumDeclaration'],
          publicOnly: true,
          require: {
            ClassDeclaration: true,
            FunctionDeclaration: true,
            MethodDefinition: true,
          },
        },
      ],
      'no-console': ['error', { allow: ['warn', 'error'] }],
    },
  },

  {
    files: ['src/**/*.spec.ts'],
    rules: {
      '@typescript-eslint/naming-convention': 'off',
      'jsdoc/require-jsdoc': 'off',
    },
  }
);
