import { CreateBaseProductReqDto } from './create-base-product.req.dto';

export interface CreateMacProductReqDto extends CreateBaseProductReqDto {
  /**
   * 디스플레이 크기
   * @example '13인치'
   */
  displaySize: string;

  /**
   * 디스플레이 가로 픽셀
   * @example '1920'
   */
  displayHorizontalPixel: string;

  /**
   * 디스플레이 세로 픽셀
   * @example '1080'
   */
  displayVerticalPixel: string;

  /**
   * 디스플레이 밝기
   * @example '100'
   */
  displayBrightness: string;

  /**
   * 상품 옵션 목록
   * @example [{ additionalPrice: 10000, detail: { cpu: '1', gpu: '1', ram: '1', storage: '1', processor: '1' } }]
   */
  options: {
    additionalPrice: number;
    detail: {
      cpu: string;
      gpu: string;
      ram: string;
      storage: string;
      processor: string;
    };
  }[];
}
