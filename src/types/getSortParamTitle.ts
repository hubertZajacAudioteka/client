import {
  GetOrdersByPageParams,
  SortDirection,
  SortParamOrder,
} from './serverSideRequest';

export const getSortParamTitle = (
  getOrdersByPageParams: GetOrdersByPageParams
) => {
  switch (getOrdersByPageParams.sortParam) {
    case SortParamOrder.Date:
      return `Sorted by date ${
        getOrdersByPageParams.sortDirection === SortDirection.Ascending
          ? 'ascending'
          : 'descending'
      }`;
    case SortParamOrder.Value:
      return `Sorted by order value ${
        getOrdersByPageParams.sortDirection === SortDirection.Ascending
          ? 'ascending'
          : 'descending'
      }`;
    case SortParamOrder.Name:
      return `Sorted by username ${
        getOrdersByPageParams.sortDirection === SortDirection.Ascending
          ? 'ascending'
          : 'descending'
      }`;
    case SortParamOrder.Email:
      return `Sorted by email ${
        getOrdersByPageParams.sortDirection === SortDirection.Ascending
          ? 'ascending'
          : 'descending'
      }`;
    default:
      return 'Show sorted records';
  }
};
