import { Filter, FilterType } from '@/types/filter';
import { GetRecordsByPageParams } from '@/types/action';

export const getClassnamesForFilter = (
  filter: Filter,
  getRecordsByPageParams: GetRecordsByPageParams
) => {
  const commonClassnames = 'text-sm mb-2 capitalize md:text-base xl:text-lg';
  switch (filter.type) {
    case FilterType.Category:
      return `${commonClassnames} ${
        'category' in getRecordsByPageParams &&
        filter.name === getRecordsByPageParams.category
          ? 'font-bold'
          : ''
      }`;
    case FilterType.Filter:
      return `${commonClassnames} ${
        filter.sortParam === getRecordsByPageParams.sortParam &&
        filter.sortDirection === getRecordsByPageParams.sortDirection &&
        'font-bold'
      }`;
  }
};
