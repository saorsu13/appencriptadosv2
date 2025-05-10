// src/api/productsTab.ts
import api from './index';
import { Product } from '@/features/product/types';

export type ProductCategory = 'app' | 'sim' | 'mobile';

/**
 * Obtiene las preguntas frecuentes (FAQs) según el idioma.
 */
export const getFaqs = (lang: string): Promise<string[]> =>
  api.get(`shop/faqs?lang=${lang}`);

/**
 * Obtiene productos de la categoría indicada y en el idioma dado.
 */
export const getProducts = (
  category: ProductCategory,
  lang = 'es',
): Promise<Product[]> =>
  api.get(`shop/getProducts?category=${category}&language=${lang}`);

/**
 * Obtiene los detalles de un producto por su ID.
 */
export const getProductsById = (id: string | number): Promise<Product> =>
  api.get(`shop/getProducts?id=${id}`);

