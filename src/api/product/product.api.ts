import { ProductCategoryEnum } from '@/utils/types/product-category.enum';
import { get, post } from '../api';
import { CreateIpadProductReqDto } from './dto/request/create-ipad-product.req.dto';
import { CreateIphoneProductReqDto } from './dto/request/create-iphone-product.req.dto';
import { CreateMacProductReqDto } from './dto/request/create-mac-product.req.dto';
import { FindAllProductsReqQuery } from './dto/request/find-all-products.req.query';
import { IPadProduct } from './dto/response/ipad-product.interface';
import { IPhoneProduct } from './dto/response/iphone-product.interface';
import { MacProduct } from './dto/response/mac-product.interface';

export class ProductApi {
  static async findAll(params: FindAllProductsReqQuery) {
    const { data } = await get<IPhoneProduct | IPadProduct | MacProduct>(
      '/product',
      {
        params,
      }
    );
    return data;
  }

  static async findAllMac(params?: Omit<FindAllProductsReqQuery, 'category'>) {
    const { data } = await get<MacProduct[]>('/product', {
      params: { category: ProductCategoryEnum.MAC, ...params },
    });
    return data;
  }

  static async findAllIphone(
    params?: Omit<FindAllProductsReqQuery, 'category'>
  ) {
    const { data } = await get<IPhoneProduct[]>('/product', {
      params: { category: ProductCategoryEnum.IPHONE, ...params },
    });
    return data;
  }

  static async findAllIpad(params?: Omit<FindAllProductsReqQuery, 'category'>) {
    const { data } = await get<IPadProduct[]>('/product', {
      params: { category: ProductCategoryEnum.IPAD, ...params },
    });
    return data;
  }

  static async createMac(dto: CreateMacProductReqDto) {
    return post('/product/mac', dto);
  }

  static async createIpad(dto: CreateIpadProductReqDto) {
    return post('/product/ipad', dto);
  }

  static async createIphone(dto: CreateIphoneProductReqDto) {
    return post('/product/iphone', dto);
  }
}
