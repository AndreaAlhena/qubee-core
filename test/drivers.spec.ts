import { globSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { DRIVERS } from '../src/drivers/driver-registry';
import { DriverEnum } from '../src/enums/driver.enum';
import { PaginationModeEnum } from '../src/enums/pagination-mode.enum';
import { ResponseOptions } from '../src/models/response-options';

const driversDir = join(fileURLToPath(new URL('.', import.meta.url)), '..', 'src', 'drivers');

describe('DRIVERS registry', () => {
  it('covers every DriverEnum member', () => {
    expect(Object.keys(DRIVERS).sort()).toEqual(Object.values(DriverEnum).sort());
  });

  it('has no orphaned driver file', () => {
    // The one hazard the per-file split introduces: a *.driver.ts nothing imports.
    const onDisk = globSync('*.driver.ts', { cwd: driversDir }).length;
    expect(onDisk).toBe(Object.keys(DRIVERS).length);
  });

  describe.each(Object.entries(DRIVERS))('%s', (_driver, definition) => {
    it('constructs a request strategy exposing capabilities', () => {
      const strategy = definition.createRequestStrategy(PaginationModeEnum.QUERY);
      expect(strategy.capabilities).toBeDefined();
      expect(typeof strategy.buildUri).toBe('function');
    });

    it('constructs a response strategy', () => {
      expect(typeof definition.createResponseStrategy().paginate).toBe('function');
    });

    it('constructs response options', () => {
      expect(definition.createResponseOptions({})).toBeInstanceOf(ResponseOptions);
    });
  });
});
