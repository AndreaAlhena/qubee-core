import {
  ApiPlatformResponseOptions,
  DirectusResponseOptions,
  DrfResponseOptions,
  FeathersResponseOptions,
  JsonApiResponseOptions,
  JsonServerResponseOptions,
  NestjsResponseOptions,
  NestjsxCrudResponseOptions,
  OdataResponseOptions,
  PayloadResponseOptions,
  PocketbaseResponseOptions,
  ResponseOptions,
  SieveResponseOptions,
  SpringResponseOptions,
  StrapiResponseOptions,
} from './response-options';

const SUBCLASSES = [
  ['ApiPlatform', ApiPlatformResponseOptions],
  ['Directus', DirectusResponseOptions],
  ['Drf', DrfResponseOptions],
  ['Feathers', FeathersResponseOptions],
  ['JsonApi', JsonApiResponseOptions],
  ['JsonServer', JsonServerResponseOptions],
  ['Nestjs', NestjsResponseOptions],
  ['NestjsxCrud', NestjsxCrudResponseOptions],
  ['Odata', OdataResponseOptions],
  ['Payload', PayloadResponseOptions],
  ['Pocketbase', PocketbaseResponseOptions],
  ['Sieve', SieveResponseOptions],
  ['Spring', SpringResponseOptions],
  ['Strapi', StrapiResponseOptions],
] as const;

const KEYS = [
  'currentPage',
  'data',
  'firstPageUrl',
  'from',
  'lastPage',
  'lastPageUrl',
  'nextPageUrl',
  'path',
  'perPage',
  'prevPageUrl',
  'to',
  'total',
] as const;

describe('ResponseOptions', () => {
  describe('base defaults', () => {
    it('falls back to the Laravel envelope', () => {
      expect({ ...new ResponseOptions({}) }).toEqual({
        currentPage: 'current_page',
        data: 'data',
        firstPageUrl: 'first_page_url',
        from: 'from',
        lastPage: 'last_page',
        lastPageUrl: 'last_page_url',
        nextPageUrl: 'next_page_url',
        path: 'path',
        perPage: 'per_page',
        prevPageUrl: 'prev_page_url',
        to: 'to',
        total: 'total',
      });
    });

    it('honours every caller-supplied key', () => {
      const custom = Object.fromEntries(KEYS.map((k) => [k, `custom.${k}`]));

      expect({ ...new ResponseOptions(custom) }).toEqual(custom);
    });

    it('exposes every key as readonly', () => {
      const options = new ResponseOptions({});

      KEYS.forEach((key) => {
        expect(typeof options[key]).toBe('string');
      });
    });
  });

  describe.each(SUBCLASSES)('%s', (_name, Options) => {
    it('is a ResponseOptions', () => {
      expect(new Options({})).toBeInstanceOf(ResponseOptions);
    });

    it('lets the caller override every key', () => {
      const custom = Object.fromEntries(KEYS.map((k) => [k, `custom.${k}`]));

      expect({ ...new Options(custom) }).toEqual(custom);
    });

    it('resolves every key to a string', () => {
      const options = new Options({});

      KEYS.forEach((key) => {
        expect(typeof options[key]).toBe('string');
      });
    });
  });

  // Characterisation: the exact resolved defaults, per driver, before the
  // `||` -> `??` fix. Any change here is a wire-format change and must be
  // deliberate — see #9.
  describe('resolved defaults per driver', () => {
    it.each(SUBCLASSES)('%s', (_name, Options) => {
      expect({ ...new Options({}) }).toMatchSnapshot();
    });
  });
});
