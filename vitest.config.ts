import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      exclude: ['**/*.spec.ts', 'src/index.ts', '**/*.type.ts', '**/*.interface.ts'],
      include: ['src/**/*.ts'],
      provider: 'v8',
      reporter: ['text-summary', 'lcov', 'html'],
      // Floor, not a target — these RATCHET UP, never down.
      // Current gap is the errors + driver-registry + driver enum, all of which
      // are exercised by QueryBuilder._assertCapability (#6) once services land.
      // ng-qubee's own figure was 95.47% statements with its service specs included.
      thresholds: {
        branches: 97,
        functions: 80,
        lines: 92,
        statements: 92,
      },
    },
    globals: true,
    // Safe here: every spec constructs its own strategy with `new` and shares no state.
    isolate: false,
    include: ['src/**/*.spec.ts'],
  },
});
