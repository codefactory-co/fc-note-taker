# 환경 변수 설정 가이드

이 파일은 NoteTaker 프로젝트의 Supabase 환경 변수 설정 방법을 안내합니다.

## 1. Supabase 프로젝트 생성

1. [Supabase Dashboard](https://supabase.com/dashboard)에 접속
2. "New Project" 버튼 클릭
3. 프로젝트 정보 입력:
   - **Name**: `note-taker` (또는 원하는 이름)
   - **Database Password**: 강력한 비밀번호 설정
   - **Region**: 가장 가까운 지역 선택
4. "Create new project" 클릭

## 2. API 키 확인

프로젝트가 생성되면:

1. 왼쪽 메뉴에서 **Settings** > **API** 클릭
2. 다음 정보를 복사:
   - **Project URL**: `https://your-project-id.supabase.co`
   - **anon public**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

## 3. 환경 변수 파일 생성

프로젝트 루트 디렉토리에 `.env.local` 파일을 생성하고 다음 내용을 추가:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 4. 인증 설정 (선택사항)

Supabase에서 이메일 인증을 활성화하려면:

1. **Authentication** > **Settings** 메뉴로 이동
2. **Enable email confirmations** 옵션을 활성화 (선택사항)
3. **Site URL**에 `http://localhost:3000` 추가 (개발용)

## 5. 보안 주의사항

- `.env.local` 파일은 절대 Git에 커밋하지 마세요
- `NEXT_PUBLIC_` 접두사가 붙은 변수는 클라이언트에서 접근 가능합니다
- Service Role Key는 서버사이드에서만 사용하고 클라이언트에 노출하지 마세요

## 6. 문제 해결

### 환경 변수가 인식되지 않는 경우:
1. `.env.local` 파일이 프로젝트 루트에 있는지 확인
2. 개발 서버를 재시작 (`npm run dev`)
3. 파일명이 정확한지 확인 (`.env.local`)

### Supabase 연결 오류:
1. Project URL과 Anon Key가 정확한지 확인
2. Supabase 프로젝트가 활성 상태인지 확인
3. 네트워크 연결 상태 확인

## 예제 환경 변수 파일

```bash
# .env.local 예제
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY5ODc2MDAwMCwiZXhwIjoyMDE0MzM2MDAwfQ.example_signature_here

# TossPayments 설정 (결제 위젯 연동 키 사용)
NEXT_PUBLIC_TOSS_CLIENT_KEY=test_ck_xxxxxxxxxxxxx
TOSS_SECRET_KEY=test_sk_xxxxxxxxxxxxx
```

이제 `npm run dev`를 실행하여 개발 서버를 시작할 수 있습니다!
