/**
 * Rename the published package everywhere it is referenced.
 *
 * npm org availability cannot be checked from the registry API — an org can
 * exist with zero public packages, which is how `@qubee` looked free when it
 * was not. So this is a script rather than a one-off edit: if a name turns out
 * to be taken, changing it again is one command.
 *
 *   node scripts/rename-package.mjs qubee-core
 */
import { globSync, readFileSync, writeFileSync } from 'node:fs';

const next = process.argv[2];

if (!next) {
  console.error('usage: node scripts/rename-package.mjs <new-package-name>');
  process.exit(1);
}

const current = JSON.parse(readFileSync('package.json', 'utf8')).name;

if (current === next) {
  console.log(`  already named ${next}`);
  process.exit(0);
}

const PATTERNS = [
  '*.md',
  '*.json',
  'src/**/*.ts',
  'test/**/*.mjs',
  'test/**/*.md',
  'test/**/*.ts',
  'docs/*.mjs',
  'docs/*.json',
  'docs/scripts/*.mjs',
  'docs/src/**/*.astro',
  'docs/src/**/*.mdx',
];

// Generated trees are rebuilt from these sources, so skip them.
const SKIP =
  /node_modules|\/dist\/|docs\/src\/content\/docs\/(api|drivers\/reference)|capabilities\.mdx/;

let files = 0;
let hits = 0;

for (const pattern of PATTERNS) {
  for (const rel of globSync(pattern)) {
    if (SKIP.test(rel)) continue;

    const before = readFileSync(rel, 'utf8');
    const found = before.split(current).length - 1;

    if (!found) continue;

    writeFileSync(rel, before.split(current).join(next));
    files += 1;
    hits += found;
  }
}

console.log(`  ${current} → ${next}`);
console.log(`  ${hits} occurrences across ${files} files`);
