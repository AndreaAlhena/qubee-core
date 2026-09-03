import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      exclude: ['**/*.spec.ts', 'src/index.ts', '**/*.type.ts', '**/*.interface.ts'],
      include: ['src/**/*.ts'],
      provider: 'v8',
      reporter: ['text-summary', 'lcov', 'html'],
      thresholds: {
        branches: 90,
        functions: 95,
        lines: 95,
        statements: 95,
      },
    },
    globals: true,
    include: ['src/**/*.spec.ts'],
  },
});
