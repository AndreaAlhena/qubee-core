# Changelog

All notable changes to this project are documented here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project
adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Framework-agnostic core extracted from [ng-qubee](https://github.com/AndreaAlhena/ng-qubee):
  18 backend drivers, `QueryBuilder`, `QubeeStore` and `Paginator`, with no Angular and no RxJS.
- `QubeeStore` exposes `getSnapshot()` + `subscribe()` — the `useSyncExternalStore` contract — so
  each adapter supplies its own reactivity.
- Derived union types (`Driver`, `FilterOperator`, `PaginationMode`, `SortDirection`) alongside the
  enums, so `{ driver: 'strapi' }` and `{ driver: DriverEnum.STRAPI }` both typecheck.
- `QubeeError` base carrying a machine-readable `code`, diagnostic `context` and ES2022 `cause`.
- `RawResponse` models the bare-array body PostgREST and the WordPress REST API return, which the
  previous types could not express.
- `PaginatedCollection.normalize()` accepts a selector function in addition to a key name.
- One file per driver under `src/drivers/`, and named re-exports from `src/index.ts`, so importing
  a single driver tree-shakes the other seventeen away.

### Fixed

- `ResponseOptions` merged with `||`, so a subclass passing `''` to mean "this driver derives the
  field" had its intent replaced by the Laravel default. Affected 11 of 14 drivers.
- All eight `Unsupported*Error` messages named specific drivers and every one had become factually
  wrong — e.g. "Filters are only supported by the Spatie and NestJS drivers" when 16 of 18 support
  them. Messages are now derived from the capability and the active driver.
- `KeyNotFoundError` and `UnselectableModelError` never set `this.name`, so `err.name` was
  `'Error'`.
- Response strategies widened the `paginate()` parameter to `Record<string, any>` while the
  interface declared `Record<string, unknown>`; TypeScript's bivariance hid the mismatch.
- Dot-path resolution could not read OData envelope keys, which contain literal dots
  (`@odata.count`). An exact key match is now preferred before splitting.

### Changed

- **Zero runtime dependencies.** `qs` was used only for
  `stringify(payload, { encode: false })`; a 40-line internal serialiser replaces it, verified
  against `qs` case by case. A single-driver import dropped from 15.7 kB to 2.5 kB gzipped.
- `generateUri()` returns a `string` synchronously and throws, rather than returning an
  `Observable`. URI construction never performed I/O.
- Data shapes are un-prefixed `type`s in `*.type.ts`; `I` and `*.interface.ts` are reserved for the
  two interfaces a class implements.
