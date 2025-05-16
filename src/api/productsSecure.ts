// src/api/productsSecure.ts
import { apiFetch } from '@/api/apiClient';

/**
 * Tipo de producto que devuelve WooCommerce vía secureApi
 */
export type ProductSecure = {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  description: string;
  short_description: string;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  purchasable: boolean;
  stock_status: 'instock' | 'outofstock' | 'onbackorder';
  stock_quantity: number | null;
  images: { id: number; src: string; name: string; alt: string }[];
  categories: { id: number; name: string; slug: string }[];
  attributes: any[];
  meta_data: {
    id: number;
    key: string;
    value: any;
  }[];
  average_rating: string;
  rating_count: number;
  price_html: string;
};

/**
 * Obtiene productos protegidos por categoría ID
 */
export const getSecureProductsByCategory = (categoryId: number) =>
  apiFetch<ProductSecure[]>(
    `/wp-json/wc/v3/products?category=${categoryId}`
  ).then(data => {
    console.log(`✅ Productos (${categoryId}):`, data.length);
    return data;
  });