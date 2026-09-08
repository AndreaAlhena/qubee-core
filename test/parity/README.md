# Parity harness

Proves the extraction is faithful: for every driver, the same query is built with
`ng-qubee@3.8.0` and with `@qubeejs/core`, and the emitted URIs are compared byte for byte.

```sh
npm run build
npm run test:parity
```

It installs `ng-qubee`, `@angular/core`, `@angular/compiler` and `rxjs` into this directory on
demand — `ng-qubee`'s FESM bundle runs `@Injectable` initialisers at import time, so the Angular
compiler has to be loaded first even though the request strategies themselves are framework-free.

Everything here is gitignored except this file and `parity.mjs`.

## Result as of the 1.0 audit

```
18 identical, 0 mismatched
```
