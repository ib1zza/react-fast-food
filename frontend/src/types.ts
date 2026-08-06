export interface Category {
  id: string;
  image: string;
  name: string;
  slug: string;
  sourceUrl: string;
}

export interface Product {
  categoryId: string;
  categoryName: string;
  description: string;
  dishId: string;
  id: string;
  image: string;
  name: string;
  price: number;
  priceText: string;
  sourceUrl: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
