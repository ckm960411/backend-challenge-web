import { useEffect, useState } from 'react';
import { CreateIpadProductReqDto } from '@/api/product/dto/request/create-ipad-product.req.dto';
import { ProductApi } from '@/api/product/product.api';
import CreateNameField from './fields/CreateNameField';
import CreateGenerationField from './fields/CreateGenerationField';
import CreateReleasedDateField from './fields/CreateReleasedDateField';
import CreatePriceField from './fields/CreatePriceField';
import CreateThicknessField from './fields/CreateThicknessField';
import CreateWeightField from './fields/CreateWeightField';
import CreateWidthField from './fields/CreateWidthField';
import CreateHeightField from './fields/CreateHeightField';
import CreateColorField from './fields/CreateColorField';
import CreatePhotoField from './fields/CreatePhotoField';
import CreateTagsField from './fields/CreateTagsField';
import CreateIpadSpecField from './fields/CreateIpadSpecField';
import CreateIpadOptionField from './fields/CreateIpadOptionField';
import { GetProductResDto } from '@/api/product/dto/response/get-product.res.dto';
import { axios } from '@/api/api';
import { ProductCategoryEnum } from '@/utils/types/product-category.enum';

interface Props {
  host: string;
}
export default function CreateIpadForm({ host }: Props) {
  const [products, setProducts] = useState<GetProductResDto[]>([]);

  useEffect(() => {
    axios
      .get(`${host}/product`, {
        params: { category: ProductCategoryEnum.IPAD },
      })
      .then(({ data }) => {
        setProducts(data);
      })
      .catch(console.error);
  }, []);

  const [formData, setFormData] = useState<CreateIpadProductReqDto>({
    name: '',
    generation: '',
    releasedDate: '',
    price: 0,
    thickness: '',
    weight: '',
    width: '',
    height: '',
    colors: [],
    photos: [],
    tags: [],
    processor: '',
    network: '',
    displaySize: '',
    displayHorizontalPixel: '',
    displayVerticalPixel: '',
    displayBrightness: '',
    options: [],
  });

  // 상품 등록
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 필수값 체크 (간단 예시)
    if (
      !formData.name ||
      !formData.price ||
      !formData.processor ||
      !formData.displaySize
    ) {
      alert('필수값을 모두 입력해 주세요.');
      return;
    }
    try {
      await ProductApi.createIpad(formData);
      alert('상품이 성공적으로 등록되었습니다!');
    } catch (err) {
      alert('상품 등록에 실패했습니다.');
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 p-6 bg-white rounded-lg shadow-sm"
    >
      <h2 className="text-xl font-semibold mb-4">iPad 상품 등록</h2>
      <div className="space-y-4">
        <CreateNameField
          name={formData.name}
          setName={(name) => setFormData({ ...formData, name })}
          productNames={products.map((p) => p.name)}
        />
        <CreateGenerationField
          generation={formData.generation}
          setGeneration={(generation) =>
            setFormData({ ...formData, generation })
          }
          generations={products.map((p) => p.generation)}
        />
        <CreateReleasedDateField
          releasedDate={formData.releasedDate}
          setReleasedDate={(releasedDate) =>
            setFormData({ ...formData, releasedDate })
          }
          releasedDates={products.map((p) => p.releasedDate)}
        />
        <CreatePriceField
          price={formData.price}
          setPrice={(price) => setFormData({ ...formData, price })}
          prices={products.map((p) => p.price)}
        />
        <div className="grid grid-cols-2 gap-4">
          <CreateThicknessField
            thickness={formData.thickness}
            setThickness={(thickness) =>
              setFormData({ ...formData, thickness })
            }
            thicknesses={products.map((p) => p.thickness)}
          />
          <CreateWeightField
            weight={formData.weight}
            setWeight={(weight) => setFormData({ ...formData, weight })}
            weights={products.map((p) => p.weight)}
          />
          <CreateWidthField
            width={formData.width}
            setWidth={(width) => setFormData({ ...formData, width })}
            widths={products.map((p) => p.width)}
          />
          <CreateHeightField
            height={formData.height}
            setHeight={(height) => setFormData({ ...formData, height })}
            heights={products.map((p) => p.height)}
          />
        </div>
        <CreateColorField
          colors={formData.colors}
          setColors={(colors) => setFormData({ ...formData, colors })}
          colorList={products.flatMap((p) => p.colors)}
        />
        <CreatePhotoField
          photos={formData.photos}
          setPhotos={(photos) => setFormData({ ...formData, photos })}
          existingPhotos={products.flatMap((p) => p.photos)}
        />
        <CreateTagsField
          tags={formData.tags}
          setTags={(tags) => setFormData({ ...formData, tags })}
          tagList={Array.from(new Set(products.flatMap((p) => p.tags)))}
        />
        {/* 디스플레이 및 주요 정보 */}
        <CreateIpadSpecField
          displaySize={formData.displaySize}
          displayHorizontalPixel={formData.displayHorizontalPixel}
          displayVerticalPixel={formData.displayVerticalPixel}
          displayBrightness={formData.displayBrightness}
          processor={formData.processor}
          network={formData.network}
          setSpecs={(specs) =>
            setFormData({
              ...formData,
              displaySize:
                specs.find((s) => s.type === 'displaySize')?.value ??
                formData.displaySize,
              displayHorizontalPixel:
                specs.find((s) => s.type === 'displayHorizontalPixel')?.value ??
                formData.displayHorizontalPixel,
              displayVerticalPixel:
                specs.find((s) => s.type === 'displayVerticalPixel')?.value ??
                formData.displayVerticalPixel,
              displayBrightness:
                specs.find((s) => s.type === 'displayBrightness')?.value ??
                formData.displayBrightness,
              processor:
                specs.find((s) => s.type === 'processor')?.value ??
                formData.processor,
              network:
                specs.find((s) => s.type === 'network')?.value ??
                formData.network,
            })
          }
          specsList={products.map((product) => product.specs)}
        />
        {/* 옵션 (storage, 추가가격) */}
        <CreateIpadOptionField
          options={formData.options}
          setOptions={(options) => setFormData({ ...formData, options })}
          optionList={products.flatMap((product) =>
            product.options.map((option) => ({
              additionalPrice: option.additionalPrice,
              detail: {
                storage:
                  option.details?.find((d) => d.type === 'storage')?.value ??
                  '',
              },
            }))
          )}
        />
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition"
          >
            상품 등록
          </button>
        </div>
      </div>
    </form>
  );
}
