export enum CategoryName {
  All = '',
  Newest = 'newest',
  Regular = 'regular',
  Discount = 'discount',
}

export interface Category {
  id: string;
  name: CategoryName;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  category: Category;
}

export interface GetProductsByPageData {
  data: Product[];
  meta: {
    per_page: number;
    total: number;
  };
}

export interface OrderedProduct {
  id: string;
  title: string;
  price: number;
  description: string;
  image: string;
  category: Category;
  quantity: number;
}

export interface FormAddProduct {
  title: string;
  description: string;
  price: number;
  image: File | null;
  category_id: string;
}

export interface FormEditProduct {
  id?: string;
  title: string;
  description: string;
  price: number;
  image?: File | null;
  category_id: string;
}

export interface DeleteProductResponse {
  isSuccess: boolean;
}
