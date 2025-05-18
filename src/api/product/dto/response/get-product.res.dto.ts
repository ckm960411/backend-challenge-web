export interface GetProductResDto {
  id: number;
  name: string;
  category: string;
  generation: string;
  releasedDate: string;
  price: number;
  thickness: string;
  weight: string;
  width: string;
  height: string;
  colors: { name: string; code: string }[];
  photos: string[];
  specs: { type: string; value: string }[];
  options: {
    additionalPrice: number;
    details: { type: string; value: string }[];
  }[];
  tags: string[];
  isPurchased: boolean;
  userProductId: number | null;
  isInWish: boolean;
  wishId: number | null;
}
