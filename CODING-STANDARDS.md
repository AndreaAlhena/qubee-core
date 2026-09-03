# Coding Standards

These rules are derived from measured practice in `ng-qubee`, not aspiration. Where a number is
given, it is the compliance rate in the source this library was extracted from.

Anything marked **[auto]** is enforced and auto-fixed by ESLint or Prettier — don't hand-maintain it.

## Naming

### Files

`kebab-case`, with a suffix that states the kind:

| Suffix | Contents |
|---|---|
| `*.interface.ts` | An interface a class actually `implements` |
| `*.type.ts` | Any other type — data shapes, unions, DTOs, mapped types |
| `*.enum.ts` | An enum |
| `*.error.ts` | An error class |
| `*.strategy.ts` | A request or response strategy |
| `*.spec.ts` | Tests, colocated beside the file under test |

### Interface vs type — the decision rule

Ask: **will a class `implements` this?**

- **Yes** → `interface`, named with an `I` prefix, in `*.interface.ts`.
- **No** → `type`, no prefix, in `*.type.ts`.

In this library exactly **two** files qualify: `IRequestStrategy` and `IResponseStrategy`.
Everything else is data and must be a `type`.

A class *can* technically `implements` a type alias — the rule is a readability convention, not a
compiler constraint. The substantive reason to prefer `type` for data is that **`interface` is
open**: two declarations of the same name merge silently, so in a published library a consumer or a
stray `.d.ts` can augment your public shapes with no error. `type` is closed.

ESLint cannot express this rule (`consistent-type-definitions` is all-or-nothing), so it is
enforced by review and by the filename split.

### Symbols

- Classes, interfaces, types, enums: `PascalCase` **[auto]**
- Enums end in `Enum`; members are `UPPER_CASE` **[auto]**
- Variables, functions, members: `camelCase` **[auto]**
- Module constants: `UPPER_SNAKE_CASE`

### Member visibility prefixes **[auto]**

- `private` members **must** carry a leading underscore — `_assertCapability`, `_uri`
- `protected` and `public` members **must not** — `parts()`, `buildUri()`

Both halves are enforced by `naming-convention` (`leadingUnderscore: 'require'` / `'forbid'`).

### Enums at the API boundary

Enums stay as `enum` declarations. Alongside each, a **derived union** widens the *public* input
surface:

```ts
export type Driver = `${DriverEnum}`;   // 'laravel' | 'strapi' | …
```

This lets a consumer write `{ driver: 'strapi' }` as well as `{ driver: DriverEnum.STRAPI }`, which
matters for React and plain-JS callers and for config that arrives as a string from an env var.

**The widening applies to public method parameters only. Internal state keeps the enum type.**
Widening state breaks two things that were verified to matter here:

- the 13 per-driver `switch` statements over `FilterOperatorEnum` enumerate every member with **no
  `default:`** — that is what makes them provably exhaustive, and a string union defeats the
  narrowing;
- 17 sites compare `sort.order === SortEnum.DESC`, which `no-unsafe-enum-comparison` rejects across
  a union.

So: widen at the door, normalize inward.

## Ordering **[auto]**

Alphabetical, within groups. Class members are grouped in this order:

```
index signatures → static props → private props → protected props → public props
→ constructor → private methods → protected methods → public methods
```

Imports are sorted alphabetically, as are named import bindings. All of this is auto-fixed by
`eslint-plugin-perfectionist`; never reorder by hand.

## Type safety

- **No `any`.** `no-explicit-any` is an error, not a warning. Use `unknown` and narrow.
- **Explicit return types** on every function and method **[auto-checked]**.
- **`import type`** for type-only imports **[auto]** — they are erased at build time, and a
  runtime export accidentally treated as type-only will silently vanish from the bundle.
- **Exhaustive switches** over enums are enforced (`switch-exhaustiveness-check`). Adding a driver
  must not silently skip a `case`.

## Structure

- **Guard clauses over nesting.** Return early; avoid `else`.
- **Small, focused functions.** Break up walls of logic.
- **Separate declarative blocks from logic blocks.**

## Documentation

Every exported class, method, function, type and enum carries JSDoc. In this library the JSDoc is
load-bearing — it encodes per-backend wire-format quirks that are not obvious from the code.

## Testing

- Every new feature ships with tests; every bug fix ships with a regression test.
- Specs are colocated: `laravel-request.strategy.spec.ts` beside `laravel-request.strategy.ts`.
- Structure: `describe('Subject') > describe('method') > it('should …')`, arrange/act/assert.
- Coverage thresholds are enforced in `vitest.config.ts` and must not be lowered to make a build
  pass.

## Git

### Commits

[Conventional Commits](https://www.conventionalcommits.org/), lowercase, imperative, scoped, short.
Reference the issue number.

```
feat(postgrest): support embedded resources (#12)
fix(response-options): stop '' collapsing to the laravel default (#31)
test(driver-registry): cover every driver definition (#8)
chore(deps): bump vitest to 5.0 (#40)
docs(readme): document the react adapter (#22)
```

**Commit messages must not contain AI assistant credits or co-author trailers.**

Keep commits **atomic** — one logical change each. A formatting pass and a behaviour change never
share a commit.

### Branching

```
feature/<issue-number>  →  develop  →  master
```

One branch per operational block, tracked by a GitHub issue. `master` is release-only.
