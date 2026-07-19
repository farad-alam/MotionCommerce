export interface CartItem {
  key: string; // productId or productId::variantId
  productId: string;
  variantId?: string;
  name: string;
  price: number;
  image?: string;
  slug: string;
  variantName?: string;
  quantity: number;
  stock: number;
}

export interface CartState {
  items: CartItem[];
  total: number;
  count: number;
}
