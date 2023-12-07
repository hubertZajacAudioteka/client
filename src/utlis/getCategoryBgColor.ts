import { CategoryName } from '@/types/product';

export const getCategoryBgColor = (category: CategoryName): string => {
  return category === 'newest'
    ? 'bg-blue-800'
    : category === 'regular'
    ? 'bg-purple-500'
    : 'bg-lime-400';
};
