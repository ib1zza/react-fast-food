export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  weightGrams?: number;
  caloriesKcal?: number;
  categoryId: string;
  image: string;
  badge?: string;
  isPopular?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedModifiers?: string[];
}
