import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      exclude: ['**/*.spec.ts', 'src/index.ts', '**/*.type.ts', '**/*.interface.ts'],
      include: ['src/**/*.ts'],
      provider: 'v8',
      reporter: ['text-summary', 'lcov', 'html'],
      // Floor, not a target — these RATCHET UP, never down.
      // ng-qubee's own figure was 95.47% statements.
      thresholds: {
        branches: 97,
        functions: 97,
        lines: 97,
        statements: 97,
      },
    },
    globals: true,
    include: ['src/**/*.spec.ts', 'test/**/*.spec.ts'],
    // Safe here: every spec constructs its own strategy with `new` and shares no state.
    isolate: false,
  },
});
