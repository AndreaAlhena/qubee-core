import { globSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const SRC = join(ROOT, 'src');

type SourceFile = {
  declarations: { kind: string; name: string; exported: boolean }[];
  name: string;
  path: string;
  text: string;
};

const DECL =
  /^(export\s+)?(?:declare\s+)?(abstract class|class|interface|type|enum|const|function)\s+(\w+)/gm;

const files: SourceFile[] = globSync('**/*.ts', { cwd: SRC })
  .filter((p: string) => !p.endsWith('.spec.ts'))
  .map((p: string): SourceFile => {
    const text = readFileSync(join(SRC, p), 'utf8');
    const declarations = [...text.matchAll(DECL)].map((m) => ({
      exported: Boolean(m[1]),
      kind: (m[2] as string).replace('abstract class', 'class'),
      name: m[3] as string,
    }));
    return { declarations, name: p.split('/').pop() as string, path: p, text };
  });

const exportedOf = (f: SourceFile): SourceFile['declarations'] =>
  f.declarations.filter((d) => d.exported);

describe('repository conventions', () => {
  it('has source files to check', () => {
    expect(files.length).toBeGreaterThan(50);
  });

  it('never mixes declaration kinds in one file', () => {
    const offenders = files
      .filter((f) => new Set(exportedOf(f).map((d) => d.kind)).size > 1)
      .map(
        (f) =>
          `${f.path} exports ${[...new Set(exportedOf(f).map((d) => d.kind))].sort().join(' + ')}`
      );
    expect(offenders).toEqual([]);
  });

  it('declares interfaces only in *.interface.ts', () => {
    const offenders = files
      .filter(
        (f) =>
          f.declarations.some((d) => d.kind === 'interface') && !f.name.endsWith('.interface.ts')
      )
      .map((f) => f.path);
    expect(offenders).toEqual([]);
  });

  it('exports types only from *.type.ts', () => {
    // File-local (non-exported) helper types may live beside their only consumer.
    const offenders = files
      .filter((f) => exportedOf(f).some((d) => d.kind === 'type') && !f.name.endsWith('.type.ts'))
      .map((f) => f.path);
    expect(offenders).toEqual([]);
  });

  it('reserves the I prefix for interfaces a class implements', () => {
    const all = files.map((f) => f.text).join('\n');
    const offenders = files
      .flatMap((f) => f.declarations.map((d) => ({ ...d, path: f.path })))
      .filter((d) => /^I[A-Z]/.test(d.name))
      .filter((d) => !new RegExp(`implements\\s+${d.name}\\b`).test(all))
      .map((d) => `${d.path}: ${d.name} is I-prefixed but no class implements it`);
    expect(offenders).toEqual([]);
  });

  it('names enums *Enum and puts them in *.enum.ts', () => {
    const offenders = files
      .flatMap((f) =>
        f.declarations.filter((d) => d.kind === 'enum').map((d) => ({ ...d, path: f.path }))
      )
      .filter((d) => !d.name.endsWith('Enum') || !d.path.endsWith('.enum.ts'))
      .map((d) => `${d.path}: ${d.name}`);
    expect(offenders).toEqual([]);
  });

  it('uses kebab-case filenames', () => {
    const offenders = files
      .filter((f) => !/^[a-z0-9]+(-[a-z0-9]+)*(\.[a-z-]+)*\.ts$/.test(f.name))
      .map((f) => f.path);
    expect(offenders).toEqual([]);
  });

  it('keeps the core framework-agnostic', () => {
    const offenders = files
      .filter((f) => /@angular|from 'rxjs'|from "rxjs"/.test(f.text))
      .map((f) => f.path);
    expect(offenders).toEqual([]);
  });

  it('imports nothing from node:', () => {
    // `@types/node` is available project-wide for this very spec; the core itself
    // must stay runnable in a browser.
    const offenders = files.filter((f) => /from 'node:/.test(f.text)).map((f) => f.path);
    expect(offenders).toEqual([]);
  });

  it('performs no network I/O', () => {
    const offenders = files
      .filter((f) =>
        /\b(fetch|XMLHttpRequest|axios)\s*\(/.test(f.text.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, ''))
      )
      .map((f) => f.path);
    expect(offenders).toEqual([]);
  });
});
