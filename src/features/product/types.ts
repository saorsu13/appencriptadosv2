// src/features/product/types.ts

export interface Product {
  id: number;
  title: string;
  price: number | string;
  currency: string;
  image: string;
  description: string;
  category: string;
  banner?: string;
  features?: any[];
  advantages?: any[];
  generaldescription?: string;
  generaltitle?: string;
}
