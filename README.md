# Yohwan Kim — Computer Vision & Edge AI

김요환의 연구와 영상 분석 제품 개발 경험을 소개하는 포트폴리오입니다.
외부 패키지, 서버 API, 외부 폰트 없이 동작하는 정적 사이트입니다.

사이트: <https://ivfour.github.io/>  
저장소: <https://github.com/IVFOUR/IVFOUR.github.io>

## 실행

Node.js 20 이상이 필요합니다. 별도 패키지 설치는 필요하지 않습니다.

```sh
npm --prefix portfolio run dev
```

미리보기: <http://127.0.0.1:4173>

```sh
npm --prefix portfolio run build
npm --prefix portfolio run verify
```

`portfolio/public/`에 배포용 파일이 만들어집니다. 수정 후에는 다시 빌드하고 브라우저를 새로 고칩니다.

## 구성

- `portfolio/src/content.mjs`: 인물 소개, 프로젝트, 기술, 경력 데이터
- `portfolio/scripts/build.mjs`: 홈·프로젝트 상세·경력 요약 HTML 생성
- `portfolio/src/styles.css`: 반응형 디자인 및 인쇄 스타일
- `portfolio/src/app.js`: 프로젝트 필터, 모바일 메뉴, 개념 시각화
- `portfolio/src/assets/`: 직접 작성한 SVG 도식
- `.github/workflows/pages.yml`: 빌드·검증·GitHub Pages 배포

홈 화면, 프로젝트 상세 3개, 인쇄 가능한 경력 요약을 제공합니다.
홈의 공간 분석 시각화와 프로젝트 일러스트는 설명용입니다. 실제 모델 추론·실험·운영 결과를 표시하지 않습니다.

## GitHub Pages

`IVFOUR/IVFOUR.github.io` 저장소에서 사용자 사이트를 배포합니다. 다른 저장소 이름으로 배포하는 프로젝트 사이트도 상대 경로로 동작합니다.

1. 배포할 저장소에 이 소스를 올립니다.
2. 저장소 **Settings → Pages → Build and deployment → Source**를 **GitHub Actions**로 선택합니다.
3. `main`에 푸시하거나 **Actions → Publish portfolio to GitHub Pages → Run workflow**를 실행합니다.
4. 배포 작업이 완료되면 GitHub가 제공하는 Pages 주소를 확인합니다.

배포 대상은 `portfolio/public/`뿐입니다. 검증 메모와 개발용 스크린샷은 포함되지 않습니다.

공식 절차: [Using custom workflows with GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
