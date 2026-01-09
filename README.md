# 펫밀 - 반려동물 맞춤형 식단 구독 서비스

반려동물의 종, 나이, 체중, 활동량 등을 분석하여 맞춤형 식단을 추천하고 구독할 수 있는 웹 애플리케이션입니다.

## 주요 기능

- 🐾 반려동물 정보 등록 및 관리
- 🍽️ 맞춤형 식단 추천
- 📦 구독 관리
- 💾 SQLite 데이터베이스를 통한 데이터 저장

## 기술 스택

### 프론트엔드
- React 19
- React Router
- Vite

### 백엔드
- Node.js
- Express
- SQLite (better-sqlite3)

## 설치 및 실행

### 1. 패키지 설치

```bash
npm install
```

### 2. 개발 서버 실행

#### 방법 1: 서버와 프론트엔드를 동시에 실행 (권장)

```bash
npm run dev:all
```

#### 방법 2: 별도 터미널에서 실행

**터미널 1 - 백엔드 서버:**
```bash
npm run server
```

**터미널 2 - 프론트엔드:**
```bash
npm run dev
```

### 3. 접속

- 프론트엔드: http://localhost:5173
- 백엔드 API: http://localhost:3001

## API 엔드포인트

### 반려동물 관련
- `POST /api/pets` - 반려동물 등록
- `GET /api/pets` - 반려동물 목록 조회
- `GET /api/pets/:id` - 반려동물 상세 조회

### 구독 관련
- `POST /api/subscriptions` - 구독 등록
- `GET /api/subscriptions` - 구독 목록 조회
- `PATCH /api/subscriptions/:id/cancel` - 구독 취소

## 데이터베이스

SQLite 데이터베이스(`pets.db`)가 자동으로 생성되며 다음 테이블을 포함합니다:

- `pets` - 반려동물 정보
- `subscriptions` - 구독 정보

## 프로젝트 구조

```
.
├── server.js              # Express 서버
├── src/
│   ├── api/
│   │   └── api.js         # API 호출 함수
│   ├── components/
│   │   └── Header.jsx     # 헤더 컴포넌트
│   ├── pages/
│   │   ├── Home.jsx       # 홈페이지
│   │   ├── PetRegister.jsx # 반려동물 등록
│   │   ├── MealPlan.jsx   # 식단 추천
│   │   └── MySubscription.jsx # 구독 관리
│   └── App.jsx            # 메인 앱 컴포넌트
└── package.json
```

## 라이센스

MIT