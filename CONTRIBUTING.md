# Contributing Guide

## 브랜치 전략

`main` 브랜치는 항상 배포 가능한 상태를 유지합니다.

```
main          # 배포 브랜치 (GitHub Pages)
└── feat/...  # 기능 개발
└── fix/...   # 버그 수정
└── chore/... # 설정, 빌드 관련
```

브랜치명은 커밋 타입과 동일한 접두사를 사용합니다.

```
feat/swiper-slide
fix/mobile-touch-event
chore/eslint-config
```

## 커밋 컨벤션

[Conventional Commits](https://www.conventionalcommits.org/)를 따릅니다.

```
<타입>: <제목>
```

| 타입       | 설명                              |
| ---------- | --------------------------------- |
| `feat`     | 새로운 기능 추가                  |
| `fix`      | 버그 수정                         |
| `style`    | 코드 스타일 변경 (기능 변경 없음) |
| `refactor` | 리팩토링                          |
| `chore`    | 빌드 설정, 패키지 업데이트 등     |
| `docs`     | 문서 수정                         |

**예시**

```
feat: 스와이퍼 슬라이드 컴포넌트 추가
fix: 모바일 터치 이벤트 오류 수정
style: BEM 클래스명 정리
chore: ESLint 설정 업데이트
docs: README 작성
```

## Pull Request

- `main`으로 직접 push하지 않습니다.
- PR 제목은 커밋 컨벤션과 동일한 형식을 사용합니다.
- 셀프 리뷰 후 팀원에게 리뷰를 요청합니다.
- 최소 1명의 승인 후 머지합니다.

## 코드 스타일

Biome 설정을 따릅니다. 저장 시 자동으로 포맷팅과 린트가 진행됩니다.

## CSS 네이밍

BEM 방법론을 사용합니다.

```
.block {}
.block__element {}
.block--modifier {}
.block__element--modifier {}
```

## 로컬 개발 환경

```bash
npm install
npm run dev
```
