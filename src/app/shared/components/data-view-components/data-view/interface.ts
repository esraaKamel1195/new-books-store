export interface Product {
  id: string;
  code?: string;
  title: string;
  author: string;
  category: string;
  price: number;
  quantity?: number;
  inventoryStatus?: string;
  rating: number;
  stock: number;
  image: string;
  description: string;
  published: string;
}
