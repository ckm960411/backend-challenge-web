import { ProductCategoryEnum } from '@/utils/types/product-category.enum';

export interface FindAllProductsReqQuery {
  /**
   * 제품 카테고리
   */
  category: ProductCategoryEnum;

  /**
   * 태그
   */
  tag?: string;

  /**
   * 상품명
   */
  name?: string;

  /**
   * 상품 최소 가격
   */
  minPrice?: number;

  /**
   * 상품 최대 가격
   */
  maxPrice?: number;

  /**
   * 정렬 기준
   */
  sortBy?: 'releasedDate' | 'price' | 'reviewCount';

  /**
   * 정렬 방향
   */
  order?: 'asc' | 'desc';
}
