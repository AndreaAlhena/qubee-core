import js from '@eslint/js';
import jsdoc from 'eslint-plugin-jsdoc';
import perfectionist from 'eslint-plugin-perfectionist';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['coverage/**', 'dist/**', 'node_modules/**'],
  },

  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,

  {
    files: ['src/**/*.ts', 'test/**/*.ts'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: { jsdoc, perfectionist },
    rules: {
      /* --- Type safety --- */
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: false }],
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      /* --- Naming: underscore required on private, forbidden elsewhere --- */
      '@typescript-eslint/naming-convention': [
        'error',
        {
          format: ['camelCase'],
          leadingUnderscore: 'require',
          modifiers: ['private'],
          selector: 'memberLike',
        },
        {
          format: ['camelCase'],
          leadingUnderscore: 'forbid',
          modifiers: ['protected'],
          selector: 'memberLike',
        },
        {
          format: ['camelCase'],
          leadingUnderscore: 'forbid',
          modifiers: ['public'],
          selector: 'memberLike',
        },
        { format: ['PascalCase'], selector: 'typeLike' },
        { format: ['UPPER_CASE'], selector: 'enumMember' },
      ],
      // Inherited debt, tracked by #7 (RawResponse). Flip to 'error' there.
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/no-unsafe-return': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      /* GATED: enabling this autofixes ~180 `||` sites and changes ResponseOptions behaviour.
         Turn on only after the characterisation tests and the coercion fix land. */
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      /* --- Modern syntax --- */
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/prefer-readonly': 'error',
      // Inherited debt, tracked by #13. Flip to 'error' there.
      '@typescript-eslint/restrict-template-expressions': 'warn',
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
      /* --- Documentation --- */
      // Re-enable after #7 removes the eslint-disable comments that detach
      // real JSDoc from its declaration and make this rule's fixer insert empty stubs.
      'jsdoc/require-jsdoc': [
        'off',
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
      'no-prototype-builtins': 'warn',
      'no-var': 'error',
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
      'prefer-const': 'error',
      'prefer-object-spread': 'error',
    },
  },

  {
    files: ['src/**/*.spec.ts', 'test/**/*.spec.ts'],
    rules: {
      '@typescript-eslint/naming-convention': 'off',
      'jsdoc/require-jsdoc': 'off',
    },
  },

  {
    // Config files only. `perfectionist/sort-objects` is deliberately NOT applied to
    // src/: `qs.stringify` emits keys in insertion order, so object-literal order is
    // wire-significant there — sorting it silently reorders query strings.
    // Config files are outside the tsconfig project, so type-checked rules
    // cannot run here. `sort-objects` is applied HERE and not to src/, because
    // `qs.stringify` emits keys in insertion order — object-literal order is
    // wire-significant in the strategies and must not be alphabetised.
    files: ['*.config.ts', '*.config.mjs'],
    ...tseslint.configs.disableTypeChecked,
    plugins: { perfectionist },
    rules: {
      ...tseslint.configs.disableTypeChecked.rules,
      'perfectionist/sort-objects': 'error',
    },
  }
);
