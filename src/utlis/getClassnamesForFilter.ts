import { Filter, FilterParam, FilterType } from '@/types/filter';
import { GetRecordsByPageParams } from '@/types/action';

export const getClassnamesForFilter = (
  filter: Filter,
  getRecordsByPageParams: GetRecordsByPageParams
) => {
  switch (filter.type) {
    case FilterType.Category:
      return `text-sm mb-2 capitalize ${
        'category' in getRecordsByPageParams &&
        filter.name === getRecordsByPageParams.category
          ? 'font-bold'
          : ''
      } md:text-base xl:text-lg`;
    case FilterType.Filter:
      return `text-sm mb-2 capitalize ${
        filter.sortParam === getRecordsByPageParams.sortParam &&
        filter.sortDirection === getRecordsByPageParams.sortDirection &&
        'font-bold'
      } md:text-base xl:text-lg`;
  }
};
