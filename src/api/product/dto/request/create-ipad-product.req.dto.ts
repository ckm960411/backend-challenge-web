import { CreateBaseProductReqDto } from './create-base-product.req.dto';

export interface CreateIpadProductReqDto extends CreateBaseProductReqDto {
  /**
   * 프로세서
   * @example 'M4'
   */
  processor: string;

  /**
   * 네트워크
   * @example 'WiFi + Cellular'
   */
  network: string;

  /**
   * 디스플레이 크기
   * @example '11인치'
   */
  displaySize: string;

  /**
   * 디스플레이 가로 픽셀
   * @example '1920'
   */
  displayHorizontalPixel: string;

  /**
   * 디스플레이 세로 픽셀
   * @example '1920'
   */
  displayVerticalPixel: string;

  /**
   * 디스플레이 밝기
   * @example '100'
   */
  displayBrightness: string;

  /**
   * 상품 옵션 목록
   * @example [{ additionalPrice: 10000, detail: { storage: '128GB' } }]
   */
  options: {
    additionalPrice: number;
    detail: {
      storage: string;
    };
  }[];
}
