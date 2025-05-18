import { useState } from 'react';

interface Spec {
  type: string;
  value: string;
}

interface Props {
  displaySize: string;
  displayHorizontalPixel: string;
  displayVerticalPixel: string;
  displayBrightness: string;
  processor: string;
  network: string;
  setSpecs: (specs: Spec[]) => void;
  specsList: Spec[][];
}

export default function CreateProcessorField({
  displaySize,
  displayHorizontalPixel,
  displayVerticalPixel,
  displayBrightness,
  processor,
  network,
  setSpecs,
  specsList,
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSpecs([{ type: name, value }]);
  };

  const specsToDisplayInfo = (specs: Spec[]) => {
    const info: Record<string, string> = {
      displaySize: '',
      displayHorizontalPixel: '',
      displayVerticalPixel: '',
      displayBrightness: '',
      processor: '',
      network: '',
    };
    specs.forEach((spec) => {
      info[spec.type] = spec.value;
    });
    return info;
  };

  const handleSuggestionClick = (specs: Spec[]) => {
    const info = specsToDisplayInfo(specs);
    setSpecs([
      { type: 'displaySize', value: info.displaySize },
      { type: 'displayHorizontalPixel', value: info.displayHorizontalPixel },
      { type: 'displayVerticalPixel', value: info.displayVerticalPixel },
      { type: 'displayBrightness', value: info.displayBrightness },
      { type: 'processor', value: info.processor },
      { type: 'network', value: info.network },
    ]);
    setIsModalOpen(false);
    setSearchTerm('');
  };

  const formatDisplayInfo = (specs: Spec[]) => {
    const info = specsToDisplayInfo(specs);
    return `${info.displaySize} / ${info.processor} / ${info.network} / 가로: ${info.displayHorizontalPixel} X 세로: ${info.displayVerticalPixel} / ${info.displayBrightness}`;
  };

  const filteredSpecsList = specsList.filter((specs) =>
    specs.some((spec) =>
      spec.value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">디스플레이 및 주요 정보</h3>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          정보 선택
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            디스플레이 크기
          </label>
          <input
            type="text"
            name="displaySize"
            value={displaySize}
            onChange={handleInputChange}
            placeholder="예: 15inch"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            디스플레이 밝기
          </label>
          <input
            type="text"
            name="displayBrightness"
            value={displayBrightness}
            onChange={handleInputChange}
            placeholder="예: 500nit"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            가로 픽셀
          </label>
          <input
            type="text"
            name="displayHorizontalPixel"
            value={displayHorizontalPixel}
            onChange={handleInputChange}
            placeholder="예: 1920px"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            세로 픽셀
          </label>
          <input
            type="text"
            name="displayVerticalPixel"
            value={displayVerticalPixel}
            onChange={handleInputChange}
            placeholder="예: 1080px"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            프로세서
          </label>
          <input
            type="text"
            name="processor"
            value={processor}
            onChange={handleInputChange}
            placeholder="예: M4"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            네트워크
          </label>
          <input
            type="text"
            name="network"
            value={network}
            onChange={handleInputChange}
            placeholder="예: WiFi + Cellular"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[600px] max-h-[80vh] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">정보 선택</h3>
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
              placeholder="정보 검색..."
              className="mb-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <div className="overflow-y-auto flex-1">
              {filteredSpecsList.map((specs, index) => (
                <div
                  key={index}
                  className="p-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
                  onClick={() => handleSuggestionClick(specs)}
                >
                  {formatDisplayInfo(specs)}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
