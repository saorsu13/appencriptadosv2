// src/features/product/types.ts
import type { FAQItem } from '@/components/molecules/FAQAccordion/FAQAccordion';


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
  faqs?: FAQItem[];

}
