export interface IPadProduct {
  // Product ID
  id: number;

  // 상품명
  name: string;

  // 상품 카테고리
  category: string;

  // 세대 Ex) 1
  generation: string;

  // 출시일
  releasedDate: string;

  // 상품 기본가격
  price: number;

  // 두께
  thickness: string;

  // 무게
  weight: string;

  // 너비
  width: string;

  // 높이
  height: string;

  // 색상 목록
  colors: { name: string; code: string }[];

  // 상품 사진 목록
  photos: string[];

  // 상품 태그 목록
  tags: string[];

  // 보유 여부 (미로그인시 false)
  isPurchased: boolean;

  // 유저 보유 상품 ID (미로그인 또는 미보유시 null)
  userProductId: number | null;

  // 유저 위시리스트 포함 여부 (미로그인시 false)
  isInWish: boolean;

  // 유저 위시리스트 ID (위시에 없거나 미로그인시 null)
  wishId: number | null;

  // 상품 리뷰 목록
  reviews: {
    // 리뷰 ID
    id: number;
    // 리뷰 작성일시
    createdAt: Date;
    // 리뷰 수정일시
    updatedAt: Date;
    // 평점
    rating: number;
    // 리뷰 내용
    content: string;
    // 리뷰 사진 목록
    photos: string[];
    // 작성자 유저 ID
    userId: number;
    // 작성자 유저 이름
    userName: string;
    // 작성자 이메일
    userEmail: string;
  }[];

  // 프로세서 ex) A17
  processor: string | null;

  // 네트워크 ex) WiFi, WiFi + Cellular
  network: string | null;

  // 디스플레이 사이즈 ex) 15inch
  displaySize: string | null;

  // 디스플레이 가로 픽셀 ex) 1920px
  displayHorizontalPixel: string | null;

  // 디스플레이 세로 픽셀 ex) 1080px
  displayVerticalPixel: string | null;

  // 디스플레이 밝기 ex) 500nit
  displayBrightness: string | null;

  // 아이패드 옵션 목록
  options: IPadOption[];

  myOption: IPadOption | null;
}

export interface IPadOption {
  // 상품옵션ID (ProductOptionId)
  id: number;
  // 옵션 추가가격
  additionalPrice: number;
  // 용량 ex) 512GB
  storage: string;
}
