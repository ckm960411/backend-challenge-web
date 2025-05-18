'use client';

import { axios } from '@/api/api';
import CreateIpadForm from '@/components/product/register/CreateIpadForm';
import CreateIphoneForm from '@/components/product/register/CreateIphoneForm';
import CreateMacForm from '@/components/product/register/CreateMacForm';
import { ProductCategoryEnum } from '@/utils/types/product-category.enum';
import { useState } from 'react';

export default function ProductRegisterPage() {
  const [host, setHost] = useState(
    process.env.NODE_ENV === 'development'
      ? 'http://localhost'
      : 'https://api.backend-challenge.com'
  );
  const [currentCategory, setCurrentCategory] = useState<ProductCategoryEnum>(
    ProductCategoryEnum.MAC
  );

  const renderForm = () => {
    switch (currentCategory) {
      case ProductCategoryEnum.MAC:
        return <CreateMacForm host={host} />;
      case ProductCategoryEnum.IPAD:
        return <CreateIpadForm host={host} />;
      case ProductCategoryEnum.IPHONE:
        return <CreateIphoneForm host={host} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-[1024px] mx-auto py-[40px]">
        <button
          onClick={() => {
            axios
              .post(`${host}/product/category`)
              .then(console.log)
              .catch(console.error);
          }}
          className="border border-gray-300 p-[8px] rounded-md bg-gray-100 shadow-md"
        >
          카테고리 생성
        </button>

        <div className="mt-6 flex gap-2">
          {Object.values(ProductCategoryEnum).map((category) => (
            <button
              key={category}
              onClick={() => setCurrentCategory(category)}
              className={`px-4 py-2 rounded-md transition-colors ${
                currentCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Host URL
          </label>
          <input
            type="text"
            value={host}
            onChange={(e) => setHost(e.target.value)}
            placeholder="예: http://localhost:3000"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <div className="flex items-center gap-[4px]">
            <button
              onClick={() => setHost('http://localhost')}
              className="border border-gray-300 p-[4px] rounded-md bg-gray-100 shadow-md"
            >
              localhost
            </button>
            <button
              onClick={() => setHost('https://api.backend-challenge.com')}
              className="border border-gray-300 p-[4px] rounded-md bg-gray-100 shadow-md"
            >
              api.backend-challenge.com
            </button>
          </div>
        </div>

        {renderForm()}
      </div>
    </div>
  );
}
