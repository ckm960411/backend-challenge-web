'use client';

import CreateIpadForm from '@/components/product/register/CreateIpadForm';
import CreateIphoneForm from '@/components/product/register/CreateIphoneForm';
import CreateMacForm from '@/components/product/register/CreateMacForm';
import { ProductCategoryEnum } from '@/utils/types/product-category.enum';
import { useState } from 'react';

export default function ProductRegisterPage() {
  const [currentCategory, setCurrentCategory] = useState<ProductCategoryEnum>(
    ProductCategoryEnum.MAC
  );

  const renderForm = () => {
    switch (currentCategory) {
      case ProductCategoryEnum.MAC:
        return <CreateMacForm />;
      case ProductCategoryEnum.IPAD:
        return <CreateIpadForm />;
      case ProductCategoryEnum.IPHONE:
        return <CreateIphoneForm />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-[1024px] mx-auto py-[40px]">
        <p className="text-18px font-semibold">상품등록</p>

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

        {renderForm()}
      </div>
    </div>
  );
}
