import { MenuItem } from './types';

export const INITIAL_MENUS: MenuItem[] = [
  // 1. 한국인의 소울푸드 (찌개·국·탕)
  { id: '1', name: '김치찌개 (참치/돼지고기)', isEnabled: true, category: '찌개·국·탕' },
  { id: '2', name: '된장찌개 (차돌/해물)', isEnabled: true, category: '찌개·국·탕' },
  { id: '3', name: '순두부찌개', isEnabled: true, category: '찌개·국·탕' },
  { id: '4', name: '부대찌개', isEnabled: true, category: '찌개·국·탕' },
  { id: '5', name: '뼈해장국 (감자탕)', isEnabled: true, category: '찌개·국·탕' },
  { id: '6', name: '갈비탕', isEnabled: true, category: '찌개·국·탕' },
  { id: '7', name: '설렁탕', isEnabled: true, category: '찌개·국·탕' },
  { id: '8', name: '육개장', isEnabled: true, category: '찌개·국·탕' },
  { id: '9', name: '삼계탕 (복날 필수)', isEnabled: true, category: '찌개·국·탕' },
  { id: '10', name: '미역국 (생일 단골)', isEnabled: true, category: '찌개·국·탕' },

  // 2. 든든한 한 그릇 (밥 요리)
  { id: '11', name: '비빔밥 (전주/돌솥)', isEnabled: true, category: '밥 요리' },
  { id: '12', name: '김치볶음밥', isEnabled: true, category: '밥 요리' },
  { id: '13', name: '제육덮밥', isEnabled: true, category: '밥 요리' },
  { id: '14', name: '오징어덮밥', isEnabled: true, category: '밥 요리' },
  { id: '15', name: '오므라이스', isEnabled: true, category: '밥 요리' },
  { id: '16', name: '카레라이스', isEnabled: true, category: '밥 요리' },
  { id: '17', name: '김밥 (참치/치즈 등)', isEnabled: true, category: '밥 요리' },
  { id: '18', name: '쌈밥 (우렁/제육)', isEnabled: true, category: '밥 요리' },
  { id: '19', name: '국밥 (순대/돼지)', isEnabled: true, category: '밥 요리' },
  { id: '20', name: '죽 (전복죽/본죽 스타일)', isEnabled: true, category: '밥 요리' },

  // 3. 호로록 면 요리
  { id: '21', name: '라면 (한국인의 주식)', isEnabled: true, category: '면 요리' },
  { id: '22', name: '짜장면', isEnabled: true, category: '면 요리' },
  { id: '23', name: '짬뽕', isEnabled: true, category: '면 요리' },
  { id: '24', name: '칼국수 (바지락/닭)', isEnabled: true, category: '면 요리' },
  { id: '25', name: '잔치국수', isEnabled: true, category: '면 요리' },
  { id: '26', name: '비빔국수', isEnabled: true, category: '면 요리' },
  { id: '27', name: '냉면 (물/비빔)', isEnabled: true, category: '면 요리' },
  { id: '28', name: '콩국수 (여름 별미)', isEnabled: true, category: '면 요리' },
  { id: '29', name: '우동', isEnabled: true, category: '면 요리' },
  { id: '30', name: '잡채 (밥반찬 혹은 덮밥)', isEnabled: true, category: '면 요리' },

  // 4. 고기 & 구이 (저녁 및 회식)
  { id: '31', name: '삼겹살 구이', isEnabled: true, category: '고기 & 구이' },
  { id: '32', name: '돼지갈비', isEnabled: true, category: '고기 & 구이' },
  { id: '33', name: '소고기 등심/안심', isEnabled: true, category: '고기 & 구이' },
  { id: '34', name: '소불고기', isEnabled: true, category: '고기 & 구이' },
  { id: '35', name: '갈비찜 (소/돼지)', isEnabled: true, category: '고기 & 구이' },
  { id: '36', name: '닭볶음탕', isEnabled: true, category: '고기 & 구이' },
  { id: '37', name: '제육볶음', isEnabled: true, category: '고기 & 구이' },
  { id: '38', name: '보쌈', isEnabled: true, category: '고기 & 구이' },
  { id: '39', name: '족발', isEnabled: true, category: '고기 & 구이' },
  { id: '40', name: '닭갈비', isEnabled: true, category: '고기 & 구이' },

  // 5. 튀김 & 치킨 (국민 간식/야식)
  { id: '41', name: '프라이드 치킨', isEnabled: true, category: '튀김 & 치킨' },
  { id: '42', name: '양념 치킨', isEnabled: true, category: '튀김 & 치킨' },
  { id: '43', name: '간장/마늘 치킨', isEnabled: true, category: '튀김 & 치킨' },
  { id: '44', name: '닭강정', isEnabled: true, category: '튀김 & 치킨' },
  { id: '45', name: '돈까스 (경양식/일식)', isEnabled: true, category: '튀김 & 치킨' },
  { id: '46', name: '치즈 돈까스', isEnabled: true, category: '튀김 & 치킨' },
  { id: '47', name: '탕수육', isEnabled: true, category: '튀김 & 치킨' },
  { id: '48', name: '깐풍기', isEnabled: true, category: '튀김 & 치킨' },
  { id: '49', name: '군만두/물만두', isEnabled: true, category: '튀김 & 치킨' },
  { id: '50', name: '새우튀김', isEnabled: true, category: '튀김 & 치킨' },

  // 6. 해산물 & 매콤한 맛
  { id: '51', name: '고등어 자반 구이', isEnabled: true, category: '해산물 & 매콤한 맛' },
  { id: '52', name: '갈치조림', isEnabled: true, category: '해산물 & 매콤한 맛' },
  { id: '53', name: '오징어볶음', isEnabled: true, category: '해산물 & 매콤한 맛' },
  { id: '54', name: '낙지볶음', isEnabled: true, category: '해산물 & 매콤한 맛' },
  { id: '55', name: '쭈꾸미볶음', isEnabled: true, category: '해산물 & 매콤한 맛' },
  { id: '56', name: '아구찜/해물찜', isEnabled: true, category: '해산물 & 매콤한 맛' },
  { id: '57', name: '간장게장/양념게장', isEnabled: true, category: '해산물 & 매콤한 맛' },
  { id: '58', name: '회 (광어/우럭/연어)', isEnabled: true, category: '해산물 & 매콤한 맛' },
  { id: '59', name: '물회', isEnabled: true, category: '해산물 & 매콤한 맛' },
  { id: '60', name: '매운탕', isEnabled: true, category: '해산물 & 매콤한 맛' },

  // 7. 분식 (학창 시절의 맛)
  { id: '61', name: '떡볶이', isEnabled: true, category: '분식' },
  { id: '62', name: '로제 떡볶이', isEnabled: true, category: '분식' },
  { id: '63', name: '라볶이', isEnabled: true, category: '분식' },
  { id: '64', name: '순대 (내장 포함)', isEnabled: true, category: '분식' },
  { id: '65', name: '튀김 모둠 (오징어/김말이)', isEnabled: true, category: '분식' },
  { id: '66', name: '어묵탕 (오뎅)', isEnabled: true, category: '분식' },
  { id: '67', name: '쫄면', isEnabled: true, category: '분식' },
  { id: '68', name: '소떡소떡', isEnabled: true, category: '분식' },
  { id: '69', name: '토스트 (이삭 스타일)', isEnabled: true, category: '분식' },
  { id: '70', name: '핫도그', isEnabled: true, category: '분식' },

  // 8. 술안주 & 별미
  { id: '71', name: '골뱅이 무침 & 소면', isEnabled: true, category: '술안주 & 별미' },
  { id: '72', name: '두부김치', isEnabled: true, category: '술안주 & 별미' },
  { id: '73', name: '해물파전', isEnabled: true, category: '술안주 & 별미' },
  { id: '74', name: '김치전', isEnabled: true, category: '술안주 & 별미' },
  { id: '75', name: '감자전', isEnabled: true, category: '술안주 & 별미' },
  { id: '76', name: '도토리묵 무침', isEnabled: true, category: '술안주 & 별미' },
  { id: '77', name: '곱창/대창 구이', isEnabled: true, category: '술안주 & 별미' },
  { id: '78', name: '순대볶음', isEnabled: true, category: '술안주 & 별미' },
  { id: '79', name: '닭발 (국물/직화)', isEnabled: true, category: '술안주 & 별미' },
  { id: '80', name: '육회', isEnabled: true, category: '술안주 & 별미' },

  // 9. 양식 & 퓨전 (외식 인기 메뉴)
  { id: '81', name: '피자 (콤비네이션/페퍼로니)', isEnabled: true, category: '양식 & 퓨전' },
  { id: '82', name: '토마토 파스타', isEnabled: true, category: '양식 & 퓨전' },
  { id: '83', name: '크림/까르보나라 파스타', isEnabled: true, category: '양식 & 퓨전' },
  { id: '84', name: '로제 파스타', isEnabled: true, category: '양식 & 퓨전' },
  { id: '85', name: '햄버거 (수제버거)', isEnabled: true, category: '양식 & 퓨전' },
  { id: '86', name: '스테이크', isEnabled: true, category: '양식 & 퓨전' },
  { id: '87', name: '샌드위치 (서브웨이 스타일)', isEnabled: true, category: '양식 & 퓨전' },
  { id: '88', name: '샐러드 (포케 포함)', isEnabled: true, category: '양식 & 퓨전' },
  { id: '89', name: '리조또', isEnabled: true, category: '양식 & 퓨전' },
  { id: '90', name: '감바스 알 아하이요', isEnabled: true, category: '양식 & 퓨전' },

  // 10. 집밥 반찬 & 기타 인기 메뉴
  { id: '91', name: '계란말이/계란찜', isEnabled: true, category: '집밥 반찬 & 기타' },
  { id: '92', name: '스팸구이', isEnabled: true, category: '집밥 반찬 & 기타' },
  { id: '93', name: '쏘야 (소세지 야채 볶음)', isEnabled: true, category: '집밥 반찬 & 기타' },
  { id: '94', name: '어묵볶음', isEnabled: true, category: '집밥 반찬 & 기타' },
  { id: '95', name: '진미채 볶음', isEnabled: true, category: '집밥 반찬 & 기타' },
  { id: '96', name: '장조림 (메추리알/소고기)', isEnabled: true, category: '집밥 반찬 & 기타' },
  { id: '97', name: '멸치볶음', isEnabled: true, category: '집밥 반찬 & 기타' },
  { id: '98', name: '시금치/콩나물 무침', isEnabled: true, category: '집밥 반찬 & 기타' },
  { id: '99', name: '샤브샤브 (가족 외식 강자)', isEnabled: true, category: '집밥 반찬 & 기타' },
  { id: '100', name: '마라탕', isEnabled: true, category: '집밥 반찬 & 기타' }
];

export const STORAGE_KEY = 'tonights_table_menus_v3';