import type { SortEnum } from '../enums/sort.enum';

export type Sort = {
  field: string;
  order: SortEnum;
};
