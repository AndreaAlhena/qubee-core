# Contributing

Thanks for considering a contribution.

## Standards

Read **[CODING-STANDARDS.md](./CODING-STANDARDS.md)** first — it is the single source of truth, and
most of it is enforced automatically. `test/conventions.spec.ts` asserts the structural rules
(one declaration kind per file, filename suffixes, the `I` prefix, constant casing), so a
convention slip fails the build rather than a review.

## Setup

```bash
npm ci
npm test
```

Node `^22.12 || ^24 || >=26` — the range CI covers.

## Before opening a pull request

```bash
npm run typecheck
npm run lint
npm run format:check
npm run test:coverage
npm run build
```

CI runs exactly these on Node 22 and 24, then verifies both entry points resolve, that the package
still has zero runtime dependencies, and that a single-driver import still tree-shakes.

Coverage thresholds ratchet up, never down. If a change drops coverage, add tests rather than
lowering the threshold.

## Adding a driver

Four steps — the compiler will tell you if you miss one, because `DRIVERS` is a closed
`Record<DriverEnum, DriverDefinition>`:

1. A `DriverEnum` member.
2. `src/strategies/<id>-request.strategy.ts` extending `AbstractRequestStrategy`, overriding
   `parts()` and declaring its `capabilities`.
3. `src/strategies/<id>-response.strategy.ts` — extend `AbstractFlatResponseStrategy` or
   `AbstractDotPathResponseStrategy` if the envelope fits, otherwise implement `IResponseStrategy`.
4. `src/drivers/<id>.driver.ts` exporting one `<ID>_DRIVER` const, plus a line in `DRIVERS` and a
   named export from `src/index.ts`.

Copy any existing `*.driver.ts` as a template. Both strategies need specs; `test/drivers.spec.ts`
will fail if a driver file is added without registering it.

## Commits

[Conventional Commits](https://www.conventionalcommits.org/), lowercase, imperative, scoped, one
logical change each, referencing the issue:

```
feat(strapi): support deep population (#42)
fix(response-options): stop '' collapsing to the laravel default (#9)
```

Commit messages must not contain AI assistant credits or co-author trailers.

Branch from `develop` as `feature/<issue-number>`; `master` is release-only.

## Releasing

1. Bump the version and update `CHANGELOG.md`.
2. Merge `develop` into `master`.
3. Tag `v<version>` and publish a GitHub Release.

The publish workflow verifies the tag matches `package.json`, re-runs every gate, and publishes to
npm with provenance via OIDC trusted publishing — there is no npm token.
