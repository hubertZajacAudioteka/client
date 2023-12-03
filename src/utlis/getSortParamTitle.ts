import {
  GetRecordsByPageParams,
  SortDirection,
  SortParamOrder,
  SortParamUser,
} from '../types/serverSideRequest';

export const getSortParamTitle = (
  getRecordsByPageParams: GetRecordsByPageParams
) => {
  switch (getRecordsByPageParams.sortParam) {
    case SortParamOrder.Date:
      return `Sorted by date ${
        getRecordsByPageParams.sortDirection === SortDirection.Ascending
          ? 'ascending'
          : 'descending'
      }`;
    case SortParamOrder.Value:
      return `Sorted by value ${
        getRecordsByPageParams.sortDirection === SortDirection.Ascending
          ? 'ascending'
          : 'descending'
      }`;
    case SortParamOrder.Name:
      return `Sorted by username ${
        getRecordsByPageParams.sortDirection === SortDirection.Ascending
          ? 'ascending'
          : 'descending'
      }`;
    case SortParamOrder.Email:
      return `Sorted by email ${
        getRecordsByPageParams.sortDirection === SortDirection.Ascending
          ? 'ascending'
          : 'descending'
      }`;
    case SortParamUser.FirstName:
      return `Sorted by first name ${
        getRecordsByPageParams.sortDirection === SortDirection.Ascending
          ? 'ascending'
          : 'descending'
      }`;
    case SortParamUser.LastName:
      return `Sorted by last name ${
        getRecordsByPageParams.sortDirection === SortDirection.Ascending
          ? 'ascending'
          : 'descending'
      }`;
    case SortParamUser.Email:
      return `Sorted by email ${
        getRecordsByPageParams.sortDirection === SortDirection.Ascending
          ? 'ascending'
          : 'descending'
      }`;
    case SortParamUser.Role:
      return `Sorted by role ${
        getRecordsByPageParams.sortDirection === SortDirection.Ascending
          ? 'ascending'
          : 'descending'
      }`;
    default:
      return 'Show sorted records';
  }
};
