import { KeyNotFoundError } from '../errors/key-not-found.error';
import { PaginatedCollection } from './paginated-collection';

type Row = { id: number; slug: string; title: string };

const rows: Row[] = [
  { id: 7, slug: 'first', title: 'First' },
  { id: 9, slug: 'second', title: 'Second' },
];

const collect = (data: Row[] = rows): PaginatedCollection<Row> =>
  new PaginatedCollection<Row>(data, 2, 1, 2, 2, 15);

describe('PaginatedCollection', () => {
  describe('construction', () => {
    it('exposes the rows and page', () => {
      const collection = collect();

      expect(collection.data).toBe(rows);
      expect(collection.page).toBe(2);
    });

    it('leaves optional metadata undefined when not supplied', () => {
      const collection = new PaginatedCollection<Row>(rows, 1);

      expect(collection.total).toBeUndefined();
      expect(collection.nextPageUrl).toBeUndefined();
    });
  });

  describe('normalize', () => {
    it('keys the result by page number', () => {
      expect(collect().normalize()).toEqual({ 2: [7, 9] });
    });

    it('defaults to the id property', () => {
      expect(collect().normalize()).toEqual({ 2: [7, 9] });
    });

    it('accepts an explicit key', () => {
      // The `id` parameter was never exercised by any upstream test.
      expect(collect().normalize('slug')).toEqual({ 2: ['first', 'second'] });
    });

    it('accepts a selector function', () => {
      expect(collect().normalize((row) => row.title)).toEqual({ 2: ['First', 'Second'] });
    });

    it('falls back to id when the named key is absent from an item', () => {
      expect(collect().normalize('missing')).toEqual({ 2: [7, 9] });
    });

    it('throws when neither the named key nor id exists', () => {
      const orphan = new PaginatedCollection([{ name: 'no identifier' }], 1);

      expect(() => orphan.normalize()).toThrow(KeyNotFoundError);
    });

    it('reports the requested key in the error', () => {
      const orphan = new PaginatedCollection([{ name: 'no identifier' }], 1);

      expect(() => orphan.normalize('slug')).toThrow(new KeyNotFoundError('slug').message);
    });

    it('returns an empty list for an empty page', () => {
      expect(collect([]).normalize()).toEqual({ 2: [] });
    });

    it('supports string identifiers', () => {
      const uuids = new PaginatedCollection([{ id: 'a1' }, { id: 'b2' }], 1);

      expect(uuids.normalize()).toEqual({ 1: ['a1', 'b2'] });
    });
  });
});
