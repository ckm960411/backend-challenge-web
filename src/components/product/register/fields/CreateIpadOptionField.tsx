import { useState } from 'react';

interface IpadOption {
  additionalPrice: number;
  detail: {
    storage: string;
  };
}

interface Props {
  options: IpadOption[];
  setOptions: (options: IpadOption[]) => void;
  optionList: IpadOption[];
}

export default function CreateIpadOptionField({
  options,
  setOptions,
  optionList,
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newOption, setNewOption] = useState<IpadOption>({
    additionalPrice: 0,
    detail: { storage: '' },
  });

  // 새 옵션 추가
  const handleAddOption = () => {
    if (newOption.detail.storage) {
      setOptions([...options, newOption]);
      setNewOption({ additionalPrice: 0, detail: { storage: '' } });
    }
  };

  // 옵션 삭제
  const handleRemoveOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  // 옵션 수정
  const handleOptionChange = (
    index: number,
    field: 'additionalPrice' | 'storage',
    value: string | number
  ) => {
    const newOptions = [...options];
    if (field === 'storage') {
      newOptions[index] = {
        ...newOptions[index],
        detail: { ...newOptions[index].detail, storage: value as string },
      };
    } else {
      newOptions[index] = {
        ...newOptions[index],
        additionalPrice: Number(value),
      };
    }
    setOptions(newOptions);
  };

  // 추천 옵션 클릭
  const handleSuggestionClick = (option: IpadOption) => {
    if (
      !options.some(
        (o) =>
          o.detail.storage === option.detail.storage &&
          o.additionalPrice === option.additionalPrice
      )
    ) {
      setOptions([...options, option]);
    }
    setIsModalOpen(false);
    setSearchTerm('');
  };

  // 추천 옵션 필터링
  const filteredOptionList = optionList.filter(
    (option) =>
      option.detail.storage.toLowerCase().includes(searchTerm.toLowerCase()) ||
      option.additionalPrice
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
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
        <div>
          <label className="block text-sm font-medium text-gray-700">
            저장소
          </label>
          <input
            type="text"
            value={newOption.detail.storage}
            onChange={(e) =>
              setNewOption({
                ...newOption,
                detail: { ...newOption.detail, storage: e.target.value },
              })
            }
            placeholder="예: 256GB"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* 선택된 옵션 목록 */}
      {options.map((option, idx) => (
        <div key={idx} className="p-4 border rounded-md space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              추가 가격
            </label>
            <input
              type="number"
              value={option.additionalPrice}
              onChange={(e) =>
                handleOptionChange(
                  idx,
                  'additionalPrice',
                  Number(e.target.value)
                )
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              저장소
            </label>
            <input
              type="text"
              value={option.detail.storage}
              onChange={(e) =>
                handleOptionChange(idx, 'storage', e.target.value)
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => handleRemoveOption(idx)}
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
                  <div className="font-medium">
                    저장소: {option.detail.storage} / 추가 가격:{' '}
                    {option.additionalPrice.toLocaleString()}원
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
