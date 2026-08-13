export interface ICategory {
  id: string;
  image: string;
  name: string;
  slug: string;
  sourceUrl: string;
}

export interface IProduct {
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

export interface ICartItem {
  product: IProduct;
  quantity: number;
}

export interface IOutlineButton {
  background: string;
  color: string;
  children: React.ReactNode;
  className: string;
};

export interface ISolidButton {
  background: string;
  color: string;
  children: React.ReactNode;
  className: string;
};