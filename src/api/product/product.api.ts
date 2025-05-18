import { post } from '../api';
import { CreateIpadProductReqDto } from './dto/request/create-ipad-product.req.dto';
import { CreateIphoneProductReqDto } from './dto/request/create-iphone-product.req.dto';
import { CreateMacProductReqDto } from './dto/request/create-mac-product.req.dto';

export class ProductApi {
  async createMac(dto: CreateMacProductReqDto) {
    return post('/products/mac', dto);
  }

  async createIpad(dto: CreateIpadProductReqDto) {
    return post('/products/ipad', dto);
  }

  async createIphone(dto: CreateIphoneProductReqDto) {
    return post('/products/iphone', dto);
  }
}
