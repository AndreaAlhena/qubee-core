/**
 * Mirror the repository CHANGELOG into the docs site.
 *
 * Generated rather than duplicated: a hand-copied changelog is a changelog that
 * silently falls behind.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const source = readFileSync(join(here, '..', '..', 'CHANGELOG.md'), 'utf8');

// Drop the H1 and the format preamble; the page frontmatter supplies both.
const body = source
  .replace(/^# Changelog\n/, '')
  .replace(/^All notable changes[\s\S]*?adheres to \[Semantic Versioning\]\([^)]+\)\.\n/m, '')
  .trim();

writeFileSync(
  join(here, '..', 'src', 'content', 'docs', 'changelog.mdx'),
  `---
title: Changelog
description: Every notable change to @qubeejs/core.
sidebar:
  order: 99
---

{/* Generated from CHANGELOG.md by scripts/generate-changelog.mjs — do not edit. */}

This project follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

${body}
`
);

console.log('  generated changelog.mdx');
