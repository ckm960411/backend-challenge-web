import { useState } from 'react';

interface Props {
  tags: string[];
  setTags: (tags: string[]) => void;
  tagList: string[]; // 기존 상품들의 태그 목록
}

export default function CreateTagsField({ tags, setTags, tagList }: Props) {
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  // 중복 없는 추천 태그 목록
  const filteredSuggestions = tagList
    .filter(
      (tag) =>
        tag.toLowerCase().includes(input.toLowerCase()) && !tags.includes(tag)
    )
    .slice(0, 10);

  // 태그 추가
  const handleAddTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setInput('');
      setShowSuggestions(false);
    }
  };

  // 엔터/쉼표로 태그 추가
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      (e.key === 'Enter' || e.key === ',') &&
      input.trim() &&
      !tags.includes(input.trim())
    ) {
      e.preventDefault();
      handleAddTag(input.trim());
    }
  };

  // 태그 삭제
  const handleRemoveTag = (idx: number) => {
    setTags(tags.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-2 relative">
      <label className="block text-sm font-medium text-gray-700">태그</label>
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag, idx) => (
          <span
            key={tag}
            className="flex items-center bg-blue-100 text-blue-700 px-2 py-1 rounded"
          >
            #{tag}
            <button
              type="button"
              onClick={() => handleRemoveTag(idx)}
              className="ml-1 text-red-500 hover:text-red-700"
              aria-label="태그 삭제"
            >
              ✕
            </button>
          </span>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          setShowSuggestions(true);
        }}
        onKeyDown={handleInputKeyDown}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        placeholder="태그 입력 후 Enter 또는 ,"
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-auto">
          {filteredSuggestions.map((suggestion) => (
            <div
              key={suggestion}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onMouseDown={() => handleAddTag(suggestion)}
            >
              #{suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
