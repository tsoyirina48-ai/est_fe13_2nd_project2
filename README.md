# [이스트캠프] 오르미 프론트엔드 개발 13기 2차 프로젝트

> ROUNZ 홈페이지의 UI/UX를 참조하여 홈페이지를 JavaScript를 활용하여 제작

![Deploy Status](https://github.com/agw76638/est_fe13_2nd_project/actions/workflows/deploy.yml/badge.svg)
[![Vite Badge](https://img.shields.io/badge/Bundler-Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Formatted with Biome](https://img.shields.io/badge/Formatted_with-Biome-60a5fa?style=flat&logo=biome)](https://biomejs.dev/)
[![Linted with Biome](https://img.shields.io/badge/Linted_with-Biome-60a5fa?style=flat&logo=biome)](https://biomejs.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

## 제작 계획

```mermaid
gantt
    title 제작 계획
    dateFormat MM/DD
    axisFormat %m/%d

    section 기획
    팀 구성 및 착수          :milestone, 05/29, 0d
    현황 분석, 스토리보드 제작                :plan1, 05/29, 7d
    기획 마무리              :milestone, 06/05, 0d

    section 디자인
    UI 디자인                :design1, 06/05, 6d
    디자인 마무리            :milestone, 06/11, 0d

    section 구현
    HTML/CSS/JavaScript 개발          :dev1, 06/11, 7d

    section 검수
    웹 표준 검사              :test1, 06/16, 2d
    웹 접근성 검사            :test2, 06/16, 2d
    크로스 브라우징 테스트    :test3, 06/17, 1d
    발표                     :milestone, 06/18, 0d
```

## 팀원

| 이름     | 역할 | 주요 담당 | GitHub                                              | 연락                  |
| -------- | ---- | --------- | --------------------------------------------------- | --------------------- |
| 안건욱   |      |           | [agw76638](https://github.com/agw76638)             | agw76638@gmail.com    |
| 송주윤   |      |           | [Polao63](https://github.com/Polao63)               | hwangdo701@gmail.com  |
| 장진혁   |      |           | [wwg98](https://github.com/wwg98)                   | wwwg98@gmail.com      |
| 최정원   |      |           | [RaeChoe](https://github.com/RaeChoe)               | picasomati@gmail.com  |
| 최이리나 |      |           | [tsoyirina48-ai](https://github.com/tsoyirina48-ai) | tsoyirina48@gmail.com |

## 기술 스택

| 분류      | 도구                                                                 |
| --------- | -------------------------------------------------------------------- |
| 빌드      | [Vite](https://vite.dev)                                             |
| 아이콘    | [Lucide](https://lucide.dev)                                         |
| CSS 리셋  | [modern-normalize](https://github.com/sindresorhus/modern-normalize) |
| 코드 품질 | [Biome](https://biomejs.dev)                                         |

## 프로젝트 구조

```
src/
├── js/
│   ├── main.js              # 전역 CSS 진입점
│   ├── pages/
│   └── modules/
└── css/
    ├── style.css            # CSS 진입점 (import만)
    ├── base/
    │   ├── variables.css    # 디자인 토큰 (색상, 간격 등)
    │   ├── reset.css        # 전역 기본 스타일
    │   └── utilities.css    # 유틸리티 클래스
    ├── layout/
    ├── modules/
    └── pages/               # 페이지별 스타일
```

## 시작하기

```bash
git clone https://github.com/agw76638/est_fe13_2nd_project.git
npm install
npm run dev
```
