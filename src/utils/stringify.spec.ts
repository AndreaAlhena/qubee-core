import qs from 'qs';

import type { QueryValue } from '../types/query-value.type';

import { stringify } from './stringify';

// Every payload shape the request strategies actually build, plus the edge
// cases around empty and nullish values. Each is asserted against `qs` itself,
// so the replacement is proven equivalent rather than assumed to be.
const CASES: [string, Record<string, QueryValue>][] = [
  ['flat pairs', { a: 1, b: 'x' }],
  ['nested operator', { filters: { status: { $eq: 'published' } } }],
  ['array values', { populate: ['author', 'category'] }],
  ['array inside nested', { filters: { status: { $in: ['draft', 'live'] } } }],
  ['deep nesting', { a: { b: { c: { d: 1 } } } }],
  ['array of objects', { a: [{ b: 1 }] }],
  ['bracketed literal key', { 'fields[articles]': 'title,body' }],
  ['booleans and zero', { a: true, b: 0 }],
  ['empty array', { populate: [] }],
  ['empty object', { filters: {} }],
  ['nested empty array', { a: { b: [] } }],
  ['undefined is skipped', { a: undefined, b: 1 }],
  ['null becomes empty', { a: null }],
  ['empty string', { a: '' }],
  ['unencoded specials', { q: 'a b&c=d' }],
  ['strapi sort pairs', { sort: ['title:asc', 'createdAt:desc'] }],
  ['feathers $in', { age: { $in: [18, 21] } }],
  ['payload where', { where: { status: { equals: 'live' } } }],
  ['json:api page', { page: { number: 1, size: 15 } }],
  ['spatie fields group', { 'fields[users]': 'id,name' }],
];

describe('stringify', () => {
  describe.each(CASES)('%s', (_name, payload) => {
    it('matches qs.stringify with encode: false', () => {
      expect(stringify(payload)).toBe(qs.stringify(payload, { encode: false }));
    });
  });

  it('returns an empty string for an empty payload', () => {
    expect(stringify({})).toBe('');
  });

  it('does not percent-encode brackets or operators', () => {
    expect(stringify({ filters: { status: { $eq: 'published' } } })).toBe(
      'filters[status][$eq]=published'
    );
  });

  it('indexes arrays rather than repeating the key', () => {
    // `URLSearchParams` would emit `populate=a&populate=b`, a different wire format.
    expect(stringify({ populate: ['a', 'b'] })).toBe('populate[0]=a&populate[1]=b');
  });
});
