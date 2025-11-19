# NoteTaker - 노트 테이킹 앱 SaaS 랜딩 페이지

이 프로젝트는 Next.js와 Supabase를 사용하여 구축된 노트 테이킹 앱 SaaS의 랜딩 페이지입니다.

## 주요 기능

- 🚀 **현대적인 랜딩 페이지**: 반응형 디자인과 아름다운 UI
- 🔐 **Supabase 인증**: 로그인/회원가입 기능
- 💳 **TossPayments 결제**: 1만원 일회성 결제로 평생 이용
- 📝 **노트 앱**: 결제 완료 후 접근 가능한 노트 테이킹 앱
- 📱 **반응형 디자인**: 모바일, 태블릿, 데스크톱 지원
- ⚡ **빠른 성능**: Next.js 15와 Tailwind CSS 4 사용

## 시작하기

### 1. Supabase 프로젝트 설정

1. [Supabase](https://supabase.com)에서 새 프로젝트를 생성하세요
2. 프로젝트 설정에서 API URL과 anon key를 복사하세요

### 2. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```bash
# Supabase Configuration
# Supabase 프로젝트 설정에서 다음 값들을 복사해서 붙여넣으세요

# Supabase 프로젝트 URL
# 예: https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url

# Supabase Anon Key (공개 키)
# 예: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# 선택사항: Supabase Service Role Key (서버사이드에서만 사용)
# 주의: 이 키는 절대 클라이언트에 노출되어서는 안 됩니다!
# SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# TossPayments 설정 (결제 위젯 연동 키 사용)
# TossPayments 개발자센터에서 발급받은 키를 설정하세요
NEXT_PUBLIC_TOSS_CLIENT_KEY=test_ck_xxxxxxxxxxxxx
TOSS_SECRET_KEY=test_sk_xxxxxxxxxxxxx
```

#### Supabase 프로젝트 설정 방법:

1. [Supabase Dashboard](https://supabase.com/dashboard)에 로그인
2. "New Project" 클릭하여 새 프로젝트 생성
3. 프로젝트 이름과 데이터베이스 비밀번호 설정
4. 프로젝트가 생성되면 Settings > API 메뉴로 이동
5. "Project URL"과 "anon public" 키를 복사하여 위의 환경 변수에 설정

### 3. Supabase 데이터베이스 설정

`supabase_migrations.sql` 파일의 내용을 Supabase SQL 에디터에서 실행하여 결제 테이블을 생성하세요.

### 4. TossPayments 설정

1. [TossPayments 개발자센터](https://developers.tosspayments.com/)에서 계정을 생성하세요.
2. **결제위젯 연동 키**를 발급받아 환경 변수에 설정하세요.
3. 결제위젯 연동 키는 다양한 결제 수단을 제공하는 위젯 방식입니다.

### 5. 개발 서버 실행

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 결과를 확인하세요.

## 기술 스택

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Authentication**: Supabase Auth
- **Database**: Supabase (PostgreSQL)
- **Payment**: TossPayments
- **Deployment**: Vercel (권장)

## 결제 플로우

1. 사용자가 회원가입/로그인
2. 가격 페이지에서 ₩10,000 결제 버튼 클릭
3. 결제 위젯 모달에서 결제 수단 선택 및 약관 동의
4. TossPayments 결제창에서 결제 진행
5. 결제 완료 후 노트 앱 접근 권한 부여
6. 헤더에 "노트 앱" 링크 표시 및 프리미엄 상태 표시

## 결제 위젯 특징

- **다양한 결제 수단**: 카드, 간편결제, 계좌이체, 가상계좌, 휴대폰 결제 등
- **사용자 친화적 UI**: 직관적인 결제 수단 선택 인터페이스
- **약관 동의**: 자동으로 약관 동의 UI 제공
- **반응형 디자인**: 모바일과 데스크톱 모두 지원

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
