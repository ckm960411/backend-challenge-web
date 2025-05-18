export interface CreateBaseProductReqDto {
  /**
   * 상품 이름
   * @example 'MacBook Pro 13인치'
   */
  name: string;

  /**
   * 상품 세대
   * @example '1'
   */
  generation: string;

  /**
   * 출시일
   * @example '2025-01-01'
   */
  releasedDate: string;

  /**
   * 상품 가격
   * @example 1000000
   */
  price: number;

  /**
   * 상품 두께
   * @example '1.5cm'
   */
  thickness: string;

  /**
   * 상품 무게
   * @example '1.5kg'
   */
  weight: string;

  /**
   * 상품 가로 너비
   * @example '1.5cm'
   */
  width: string;

  /**
   * 상품 세로 높이
   * @example '1.5cm'
   */
  height: string;

  /**
   * 상품 색상 목록
   * @example [{ name: '금호동 네이비', code: '#001487' }]
   */
  colors: { name: string; code: string }[];

  /**
   * 상품 사진 목록
   * @example [{ url: 'https://example.com/photo.jpg' }]
   */
  photos: string[];

  /**
   * 상품 태그 목록
   * @example ['MacBook Pro', '13인치', '금호동 네이비']
   */
  tags: string[];
}
