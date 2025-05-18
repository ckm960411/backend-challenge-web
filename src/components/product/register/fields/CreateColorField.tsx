'use client';

import { useState } from 'react';

interface Color {
  name: string;
  code: string;
}

interface Props {
  colors: Color[];
  setColors: (colors: Color[]) => void;
  colorList: Color[];
}

export default function CreateColorField({
  colors,
  setColors,
  colorList,
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newColor, setNewColor] = useState<Color>({ name: '', code: '' });

  const handleInputChange = (
    index: number,
    field: 'name' | 'code',
    value: string
  ) => {
    const newColors = [...colors];
    newColors[index] = { ...newColors[index], [field]: value };
    setColors(newColors);
  };

  const handleAddColor = () => {
    if (newColor.name && newColor.code) {
      setColors([...colors, newColor]);
      setNewColor({ name: '', code: '' });
    }
  };

  const handleRemoveColor = (index: number) => {
    const newColors = colors.filter((_, i) => i !== index);
    setColors(newColors);
  };

  const handleSuggestionClick = (color: Color) => {
    if (!colors.some((c) => c.name === color.name)) {
      setColors([...colors, color]);
    }
    setIsModalOpen(false);
    setSearchTerm('');
  };

  const filteredColorList = colorList.filter(
    (color) =>
      color.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      color.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">색상 정보</h3>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            색상 선택
          </button>
          <button
            type="button"
            onClick={handleAddColor}
            className="px-3 py-1 text-sm bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            색상 추가
          </button>
        </div>
      </div>

      {/* 새 색상 입력 */}
      <div className="grid grid-cols-2 gap-4 p-4 border rounded-md">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            색상명
          </label>
          <input
            type="text"
            value={newColor.name}
            onChange={(e) => setNewColor({ ...newColor, name: e.target.value })}
            placeholder="예: 스페이스 그레이"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            색상 코드
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={newColor.code}
              onChange={(e) =>
                setNewColor({ ...newColor, code: e.target.value })
              }
              placeholder="예: #808080"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <div
              className="mt-1 w-8 h-8 rounded-md border"
              style={{ backgroundColor: newColor.code }}
            />
          </div>
        </div>
      </div>

      {/* 선택된 색상 목록 */}
      {colors.map((color, index) => (
        <div
          key={index}
          className="grid grid-cols-2 gap-4 p-4 border rounded-md"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              색상명
            </label>
            <input
              type="text"
              value={color.name}
              onChange={(e) => handleInputChange(index, 'name', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              색상 코드
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={color.code}
                onChange={(e) =>
                  handleInputChange(index, 'code', e.target.value)
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <div
                className="mt-1 w-8 h-8 rounded-md border"
                style={{ backgroundColor: color.code }}
              />
              <button
                type="button"
                onClick={() => handleRemoveColor(index)}
                className="mt-1 px-2 text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[600px] max-h-[80vh] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">색상 선택</h3>
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
              placeholder="색상명 또는 색상 코드로 검색..."
              className="mb-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <div className="overflow-y-auto flex-1">
              {filteredColorList.map((color, index) => (
                <div
                  key={index}
                  className="p-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0 flex items-center gap-4"
                  onClick={() => handleSuggestionClick(color)}
                >
                  <div
                    className="w-8 h-8 rounded-md border"
                    style={{ backgroundColor: color.code }}
                  />
                  <div>
                    <div className="font-medium">{color.name}</div>
                    <div className="text-sm text-gray-500">{color.code}</div>
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
