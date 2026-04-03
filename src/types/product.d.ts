type Size = {
  s?: number;
  m?: number;
  l?: number;
  xl?: number;
};

export type Product = {
  id: string;
  title: string;
  price: number;
  image: string;
  isWishlist: boolean;
  brand: string;
  size: Size;
  description: string;
  totalRating: number;
  reviewCount: number;
  reviews: any[];
  maxPurchasedAtOnce: number;
  quantity: number;
  sizes: Size
};
