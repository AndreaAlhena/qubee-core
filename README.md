# @qubee/core

Framework-agnostic query builder and paginator with pluggable drivers for 18 backend querying
standards.

> **Status: pre-release.** Extracted from [ng-qubee](https://github.com/AndreaAlhena/ng-qubee),
> which remains fully supported and unaffected.

## What it does

Builds query URIs and parses paginated responses. **It performs no I/O** — there is no HTTP client
and no transport layer. You fetch however you like and hand the response body back.

That is what makes it framework-agnostic: no Angular, no React, no RxJS, no Signals.

```ts
import { QueryBuilder } from '@qubee/core';

const qb = new QueryBuilder({ driver: 'strapi' });

const uri = qb
  .setResource('articles')
  .addFilter('status', 'published')
  .addSort('createdAt', 'desc')
  .setLimit(25)
  .generateUri();
// → /articles?filters[status][$eq]=published&sort[0]=createdAt:desc&pagination[pageSize]=25
```

## Supported drivers

API Platform · Directus · Django REST Framework · Feathers · JSON:API · json-server · Laravel ·
NestJS · @nestjsx/crud · OData · Payload · PocketBase · PostgREST · Sieve · Spatie · Spring Data
REST · Strapi · WordPress REST

## Adapters

| Package | Framework |
|---|---|
| `@qubee/core` | none — vanilla TS/JS |
| [`ng-qubee`](https://github.com/AndreaAlhena/ng-qubee) | Angular |
| `@qubee/react` | React *(planned)* |

## Contributing

See [CODING-STANDARDS.md](./CODING-STANDARDS.md).

## License

MIT © [Andrea Tantimonaco](https://andreatantimonaco.me)
