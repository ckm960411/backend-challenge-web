'use client';

import { useState } from 'react';

interface Spec {
  type: string;
  value: string;
}

interface Option {
  additionalPrice: number;
  details: Spec[];
}

interface Props {
  options: Option[];
  setOptions: (options: Option[]) => void;
  optionList: Option[];
}

export default function CreateOptionField({
  options,
  setOptions,
  optionList,
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newOption, setNewOption] = useState<Option>({
    additionalPrice: 0,
    details: [
      { type: 'processor', value: '' },
      { type: 'storage', value: '' },
      { type: 'ram', value: '' },
      { type: 'gpu', value: '' },
      { type: 'cpu', value: '' },
    ],
  });

  const handleInputChange = (
    index: number,
    field: 'additionalPrice' | 'details',
    value: number | Spec[]
  ) => {
    const newOptions = [...options];
    newOptions[index] = {
      ...newOptions[index],
      [field]: value,
    };
    setOptions(newOptions);
  };

  const handleDetailChange = (
    optionIndex: number,
    detailIndex: number,
    value: string
  ) => {
    const newOptions = [...options];
    newOptions[optionIndex].details[detailIndex].value = value;
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    if (newOption.details.every((detail) => detail.value)) {
      setOptions([...options, newOption]);
      setNewOption({
        additionalPrice: 0,
        details: [
          { type: 'processor', value: '' },
          { type: 'storage', value: '' },
          { type: 'ram', value: '' },
          { type: 'gpu', value: '' },
          { type: 'cpu', value: '' },
        ],
      });
    }
  };

  const handleRemoveOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const handleSuggestionClick = (option: Option) => {
    if (
      !options.some((o) =>
        o.details.every((d, i) => d.value === option.details[i].value)
      )
    ) {
      setOptions([...options, option]);
    }
    setIsModalOpen(false);
    setSearchTerm('');
  };

  const formatOption = (option: Option) => {
    const details = option.details
      .map((detail) => `${detail.type}: ${detail.value}`)
      .join(' / ');
    return `${details} (+${option.additionalPrice.toLocaleString()}원)`;
  };

  const filteredOptionList = optionList.filter((option) =>
    option.details.some(
      (detail) =>
        detail.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        detail.value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">옵션 정보</h3>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            옵션 선택
          </button>
          <button
            type="button"
            onClick={handleAddOption}
            className="px-3 py-1 text-sm bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            옵션 추가
          </button>
        </div>
      </div>

      {/* 새 옵션 입력 */}
      <div className="p-4 border rounded-md space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            추가 가격
          </label>
          <input
            type="number"
            value={newOption.additionalPrice}
            onChange={(e) =>
              setNewOption({
                ...newOption,
                additionalPrice: Number(e.target.value),
              })
            }
            placeholder="예: 200000"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {newOption.details.map((detail, index) => (
            <div key={detail.type}>
              <label className="block text-sm font-medium text-gray-700">
                {detail.type.toUpperCase()}
              </label>
              <input
                type="text"
                value={detail.value}
                onChange={(e) => {
                  const newDetails = [...newOption.details];
                  newDetails[index] = { ...detail, value: e.target.value };
                  setNewOption({ ...newOption, details: newDetails });
                }}
                placeholder={`예: ${
                  detail.type === 'storage' ? '512GB' : '12core'
                }`}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 선택된 옵션 목록 */}
      {options.map((option, optionIndex) => (
        <div key={optionIndex} className="p-4 border rounded-md space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              추가 가격
            </label>
            <input
              type="number"
              value={option.additionalPrice}
              onChange={(e) =>
                handleInputChange(
                  optionIndex,
                  'additionalPrice',
                  Number(e.target.value)
                )
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {option.details.map((detail, detailIndex) => (
              <div key={detail.type}>
                <label className="block text-sm font-medium text-gray-700">
                  {detail.type.toUpperCase()}
                </label>
                <input
                  type="text"
                  value={detail.value}
                  onChange={(e) =>
                    handleDetailChange(optionIndex, detailIndex, e.target.value)
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => handleRemoveOption(optionIndex)}
              className="px-2 text-red-500 hover:text-red-700"
            >
              ✕ 옵션 제거
            </button>
          </div>
        </div>
      ))}

      {/* 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[600px] max-h-[80vh] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">옵션 선택</h3>
              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(false);
                  setSearchTerm('');
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="옵션 검색..."
              className="mb-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <div className="overflow-y-auto flex-1">
              {filteredOptionList.map((option, index) => (
                <div
                  key={index}
                  className="p-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
                  onClick={() => handleSuggestionClick(option)}
                >
                  <div className="font-medium">{formatOption(option)}</div>
                  <div className="text-sm text-gray-500">
                    {option.details.map((detail) => (
                      <span key={detail.type} className="mr-4">
                        {detail.type}: {detail.value}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
