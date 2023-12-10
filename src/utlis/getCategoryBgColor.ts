import { CategoryName } from '@/types/product';

export const getCategoryBgColor = (category: CategoryName): string => {
  switch (category) {
    case CategoryName.Regular:
      return 'bg-purple-500';
    case CategoryName.Newest:
      return 'bg-blue-800';
    case CategoryName.Discount:
      return 'bg-lime-400';
    default:
      return 'bg-black';
  }
};
