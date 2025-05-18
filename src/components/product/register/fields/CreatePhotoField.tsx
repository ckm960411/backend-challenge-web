import { AwsApi } from '@/api/aws/aws.api';
import axios from 'axios';
import { ChangeEvent, useState } from 'react';

interface Props {
  photos: string[];
  setPhotos: (photos: string[]) => void;
  existingPhotos: string[]; // 기존 상품의 사진 리스트
}

export default function CreatePhotoField({
  photos,
  setPhotos,
  existingPhotos,
}: Props) {
  // 기존 사진 선택 상태
  const [selectedExisting, setSelectedExisting] = useState<string[]>([]);

  // 기존 사진 선택/해제
  const handleExistingSelect = (url: string) => {
    let updated;
    if (selectedExisting.includes(url)) {
      updated = selectedExisting.filter((u) => u !== url);
    } else {
      if (selectedExisting.length >= 10) return; // 최대 10개 제한
      updated = [...selectedExisting, url];
    }
    setSelectedExisting(updated);
    // 기존 선택 + 새 업로드 사진을 합쳐서 setPhotos
    setPhotos([
      ...updated,
      ...photos.filter((p) => !existingPhotos.includes(p)),
    ]);
  };

  // 파일 업로드
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const fileArray = Array.from(files);
    const photoURLs: string[] = [];
    for (const file of fileArray) {
      const { presignedUrl, url } = await AwsApi.getPresignedUrl(
        file.type.split('/')[1]
      );
      await axios.put(presignedUrl, file, {
        headers: {
          'Content-Type': file.type,
        },
      });
      photoURLs.push(url);
    }
    // 기존 선택된 사진 + 새 업로드 사진
    setPhotos([...selectedExisting, ...photoURLs]);
  };

  // 사진 삭제
  const handleRemove = (idx: number) => {
    const newPhotos = photos.filter((_, i) => i !== idx);
    setPhotos(newPhotos);
    setSelectedExisting(newPhotos.filter((p) => existingPhotos.includes(p)));
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        사진 첨부
      </label>
      {/* 기존 사진 미리보기 및 선택 */}
      {existingPhotos.length > 0 && (
        <div className="mb-2">
          <div className="text-xs text-gray-500 mb-1">
            기존 사진 선택 (최대 10개)
          </div>
          <div className="flex gap-2 flex-wrap">
            {existingPhotos.slice(0, 10).map((url) => (
              <label key={url} className="relative w-20 h-20 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedExisting.includes(url)}
                  onChange={() => handleExistingSelect(url)}
                  className="absolute top-1 left-1 z-10"
                  disabled={
                    !selectedExisting.includes(url) &&
                    selectedExisting.length >= 10
                  }
                />
                <img
                  src={url}
                  alt="기존사진"
                  className={`w-20 h-20 object-cover rounded border ${
                    selectedExisting.includes(url) ? 'ring-2 ring-blue-500' : ''
                  }`}
                />
              </label>
            ))}
          </div>
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="block"
      />
      <div className="flex gap-2 flex-wrap mt-2">
        {photos.map((photo, idx) => (
          <div key={idx} className="relative w-24 h-24">
            <img
              src={photo}
              alt={`첨부사진${idx + 1}`}
              className="w-24 h-24 object-cover rounded border"
            />
            <button
              type="button"
              onClick={() => handleRemove(idx)}
              className="absolute top-1 right-1 bg-white bg-opacity-80 rounded-full px-1 text-red-500 hover:text-red-700"
              aria-label="사진 삭제"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
