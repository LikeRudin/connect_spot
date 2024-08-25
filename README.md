This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

### Connect Spot 소개

### 기본기능

- 인증인가

  - 로그인
  - 로그아웃
  - 회원가입

- 게시물

  - 작성
  - 수정
  - 삭제
  - 좋아요
  - 댓글작성

    노마드코더에서 진행하는 React JS 스터디 5기의 마지막 과제입니다.
    위에 작성한 기본기능을 시작으로, 점진적으로 기능을 업데이트할것 입니다.

### 용어

본 프로그램의 컨셉에따라 다음과같은 용어를 사용합니다.

| **용어** | **뜻**       |
| -------- | ------------ |
| spot     | 게시물       |
| marker   | 댓글         |
| connect  | 좋아요, 공감 |

### Spot의 종류

| **Category**    | **역할**         |
| --------------- | ---------------- |
| Spot            | 일반 게시글      |
| Gather          | 모임 모집글      |
| After-Gathering | 모임 후기글      |
| SpotReview      | 장소 방문 후기글 |
| SpotRecommend   | 장소 추천글      |

### 폴더/파일 역할

| **src/**                | **Description**                                                                                                       | **참고** |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------- | -------- |
| **app**                 | page, action등을 보관하는 폴더                                                                                        |          |
| **middleware.ts**       | next middleware 함수를 보관하는 파일                                                                                  |          |
| **lib**                 | 의존성 라이브러리 코드를 가공하거나, 편리하게 사용하기위한 다양한 함수 보관                                           |          |
| **components**          | 컴포넌트를 보관하는 폴더                                                                                              |          |
| **components/designs**  | UI 컴포넌트를 보관하는 폴더                                                                                           |          |
| **components/features** | 비즈니스 로직을 포함하는 컴포넌트를 보관하는 폴더. (컴포넌트에 액션의 실행, 비즈니스 로직관련 데이터 타입등이 포함됨) |          |

### 페이지 라우터 설계도

| **src**                    | **Description**                              | **Actions**                                               |
| -------------------------- | -------------------------------------------- | --------------------------------------------------------- |
| **/**                      | spot을 모아보는 페이지                       | getSpots, createSpot, connectSpot, postSpot               |
| **/login**                 | 사용자의 로그인 을 처리하는 페이지           | login, join                                               |
| **/join**                  | 사용자의 회원가입을 처리하는 페이지          | login, join                                               |
| **/spots/[id]**            | 특정 spot의 상세 페이지                      | getSpot,updateSpot, deleteSpot, markerOnSpot, connectSpot |
| **/search**                | 사용자가 검색을 통해 특정 spot를 찾는 페이지 | searchSpot                                                |
| **/users/[username]**      | 특정 사용자의 프로필 페이지                  | getProfile                                                |
| **/users/[username]/edit** | 사용자 프로필 수정페이지                     | editProfile                                               |

### 위의 내역은 업데이트 해야합니다
