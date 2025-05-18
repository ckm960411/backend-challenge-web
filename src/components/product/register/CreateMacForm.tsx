'use client';

import { ProductApi } from '@/api/product/product.api';
import { useEffect, useState } from 'react';
import CreateNameField from './fields/CreateNameField';
import { map } from 'lodash';
import CreateGenerationField from './fields/CreateGenerationField';
import CreateReleasedDateField from './fields/CreateReleasedDateField';
import CreatePriceField from './fields/CreatePriceField';
import CreateThicknessField from './fields/CreateThicknessField';
import CreateWeightField from './fields/CreateWeightField';
import CreateWidthField from './fields/CreateWidthField';
import CreateHeightField from './fields/CreateHeightField';
import CreateDisplayField from './fields/CreateDisplayField';
import CreateColorField from './fields/CreateColorField';
import CreateOptionField from './fields/CreateOptionField';
import CreatePhotoField from './fields/CreatePhotoField';
import CreateTagsField from './fields/CreateTagsField';
import { GetProductResDto } from '@/api/product/dto/response/get-product.res.dto';
import { CreateMacProductReqDto } from '@/api/product/dto/request/create-mac-product.req.dto';

export default function CreateMacForm() {
  const [products, setProducts] = useState<GetProductResDto[]>([]);

  useEffect(() => {
    ProductApi.findAllMac().then(setProducts).catch(console.error);
  }, []);

  const [formData, setFormData] = useState<CreateMacProductReqDto>({
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
    displaySize: '',
    displayHorizontalPixel: '',
    displayVerticalPixel: '',
    displayBrightness: '',
    options: [],
  });

  // 상품 등록 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const missingFields: string[] = [];

    if (!formData.name.trim()) missingFields.push('이름');
    if (!formData.generation.trim()) missingFields.push('세대');
    if (!formData.releasedDate.trim()) missingFields.push('출시일');
    if (!formData.price) missingFields.push('가격');
    if (!formData.thickness.trim()) missingFields.push('두께');
    if (!formData.weight.trim()) missingFields.push('무게');
    if (!formData.width.trim()) missingFields.push('가로');
    if (!formData.height.trim()) missingFields.push('세로');
    if (!formData.displaySize.trim()) missingFields.push('디스플레이 크기');
    if (!formData.displayHorizontalPixel.trim())
      missingFields.push('가로 해상도');
    if (!formData.displayVerticalPixel.trim())
      missingFields.push('세로 해상도');
    if (!formData.displayBrightness.trim()) missingFields.push('밝기');
    if (!formData.colors.length) missingFields.push('색상');
    if (
      formData.colors.some((color) => !color.name.trim() || !color.code.trim())
    )
      missingFields.push('색상(이름/코드)');
    if (!formData.photos.length) missingFields.push('사진');
    if (!formData.tags.length) missingFields.push('태그');
    if (!formData.options.length) missingFields.push('옵션');
    formData.options.forEach((option, idx) => {
      if (!option.detail.processor.trim())
        missingFields.push(`옵션${idx + 1} PROCESSOR`);
      if (!option.detail.storage.trim())
        missingFields.push(`옵션${idx + 1} STORAGE`);
      if (!option.detail.ram.trim()) missingFields.push(`옵션${idx + 1} RAM`);
      if (!option.detail.gpu.trim()) missingFields.push(`옵션${idx + 1} GPU`);
      if (!option.detail.cpu.trim()) missingFields.push(`옵션${idx + 1} CPU`);
    });

    if (missingFields.length > 0) {
      alert(`다음 필드를 입력해 주세요: ${missingFields.join(', ')}`);
      return;
    }

    // 등록 API 호출
    try {
      await ProductApi.createMac(formData);
      alert('상품이 성공적으로 등록되었습니다!');
      // 필요하다면 폼 초기화 또는 페이지 이동 등 추가 동작
    } catch (error) {
      alert('상품 등록에 실패했습니다. 다시 시도해 주세요.');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-8 p-6 bg-white rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Mac 상품 등록</h2>
        <div className="space-y-6">
          {/* 기본 정보 */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">기본 정보</h3>

            <CreateNameField
              name={formData.name}
              setName={(name) => setFormData({ ...formData, name })}
              productNames={map(products, 'name')}
            />
            <CreateGenerationField
              generation={formData.generation}
              setGeneration={(generation) =>
                setFormData({ ...formData, generation })
              }
              generations={map(products, 'generation')}
            />
            <CreateReleasedDateField
              releasedDate={formData.releasedDate}
              setReleasedDate={(releasedDate) =>
                setFormData({ ...formData, releasedDate })
              }
              releasedDates={map(products, 'releasedDate')}
            />
            <CreatePriceField
              price={formData.price}
              setPrice={(price) => setFormData({ ...formData, price })}
              prices={map(products, 'price')}
            />
          </div>

          {/* 크기 정보 */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">크기 정보</h3>
            <div className="grid grid-cols-2 gap-4">
              <CreateThicknessField
                thickness={formData.thickness}
                setThickness={(thickness) =>
                  setFormData({ ...formData, thickness })
                }
                thicknesses={map(products, 'thickness')}
              />
              <CreateWeightField
                weight={formData.weight}
                setWeight={(weight) => setFormData({ ...formData, weight })}
                weights={map(products, 'weight')}
              />
              <CreateWidthField
                width={formData.width}
                setWidth={(width) => setFormData({ ...formData, width })}
                widths={map(products, 'width')}
              />
              <CreateHeightField
                height={formData.height}
                setHeight={(height) => setFormData({ ...formData, height })}
                heights={map(products, 'height')}
              />
            </div>
          </div>

          {/* 디스플레이 정보 */}
          <CreateDisplayField
            displaySize={formData.displaySize}
            displayHorizontalPixel={formData.displayHorizontalPixel}
            displayVerticalPixel={formData.displayVerticalPixel}
            displayBrightness={formData.displayBrightness}
            setDisplaySpecs={(specs) =>
              setFormData({
                ...formData,
                displaySize:
                  specs.find((spec) => spec.type === 'displaySize')?.value ??
                  formData.displaySize,
                displayHorizontalPixel:
                  specs.find((spec) => spec.type === 'displayHorizontalPixel')
                    ?.value ?? formData.displayHorizontalPixel,
                displayVerticalPixel:
                  specs.find((spec) => spec.type === 'displayVerticalPixel')
                    ?.value ?? formData.displayVerticalPixel,
                displayBrightness:
                  specs.find((spec) => spec.type === 'displayBrightness')
                    ?.value ?? formData.displayBrightness,
              })
            }
            specsList={products.map((product) => product.specs)}
          />

          {/* 색상 정보 */}
          <CreateColorField
            colors={formData.colors}
            setColors={(colors) => setFormData({ ...formData, colors })}
            colorList={products.flatMap((product) => product.colors)}
          />

          {/* 사진 첨부 */}
          <CreatePhotoField
            photos={formData.photos}
            setPhotos={(photos) => setFormData({ ...formData, photos })}
            existingPhotos={products.flatMap((product) => product.photos)}
          />

          {/* 태그 */}
          <CreateTagsField
            tags={formData.tags}
            setTags={(tags) => setFormData({ ...formData, tags })}
            tagList={Array.from(
              new Set(products.flatMap((product) => product.tags))
            )}
          />

          {/* 옵션 정보 */}
          <CreateOptionField
            options={formData.options.map((option) => ({
              additionalPrice: option.additionalPrice,
              details: [
                { type: 'processor', value: option.detail.processor },
                { type: 'storage', value: option.detail.storage },
                { type: 'ram', value: option.detail.ram },
                { type: 'gpu', value: option.detail.gpu },
                { type: 'cpu', value: option.detail.cpu },
              ],
            }))}
            setOptions={(options) =>
              setFormData({
                ...formData,
                options: options.map((option) => ({
                  additionalPrice: option.additionalPrice,
                  detail: {
                    processor:
                      option.details.find((d) => d.type === 'processor')
                        ?.value ?? '',
                    storage:
                      option.details.find((d) => d.type === 'storage')?.value ??
                      '',
                    ram:
                      option.details.find((d) => d.type === 'ram')?.value ?? '',
                    gpu:
                      option.details.find((d) => d.type === 'gpu')?.value ?? '',
                    cpu:
                      option.details.find((d) => d.type === 'cpu')?.value ?? '',
                  },
                })),
              })
            }
            optionList={products.flatMap((product) =>
              product.options.map((option) => ({
                additionalPrice: option.additionalPrice,
                details: option.details,
              }))
            )}
          />
        </div>
        <div className="mt-8 flex justify-end">
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
