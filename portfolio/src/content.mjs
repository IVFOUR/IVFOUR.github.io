export const profile = {
  name: '김요환',
  nameEn: 'Yohwan Kim',
  role: 'Computer Vision & Edge AI Engineer',
  github: 'https://github.com/IVFOUR',
  introduction: '산업용 이상탐지와 세그멘테이션을 연구하고, 영상 분석 소프트웨어를 현장에 연결합니다. 데이터 수집부터 모델 적용, 배포와 운영까지 이어지는 문제를 다룹니다.',
  updated: '2026.10',
};

export const projects = [
  {
    id: 'ad-sam', number: '01', category: 'research', categoryLabel: 'RESEARCH',
    title: '도메인을 이해하는\n세그멘테이션',
    shortTitle: 'AD-SAM · 도메인 적응 세그멘테이션',
    subtitle: 'AD-SAM / Domain Adaptation',
    description: 'SAM의 사전학습 지식에 도메인 정보를 더해, 산업 이미지의 분할 문제를 다뤘습니다.',
    tags: ['PyTorch', 'SAM', 'Domain Adaptation'],
    image: 'segmentation.svg', imageAlt: '분할 마스크와 결함 영역을 여러 층으로 표현한 AD-SAM 설명용 일러스트',
    color: 'sage', period: '2023 연구 · 2025 논문', role: '모델 설계 · 실험 · 제1저자',
    context: '산업 이미지에서는 일반적인 사전학습 모델이 모든 결함과 경계를 충분히 구분하지 못할 수 있습니다. 기존 모델의 지식을 유지하면서 도메인 정보를 반영하는 방법을 연구했습니다.',
    challenge: '범용 모델의 지식과 산업 도메인의 차이를 연결하기',
    contribution: [
      '기존 SAM 가중치를 고정하고 도메인 적응 모듈을 학습하는 모델을 설계했습니다.',
      'Domain Adapter, Domain Token, Mask Synthesizer를 활용하는 AD-SAM 구조를 연구했습니다.',
      '공개 분할·이상탐지 데이터셋 6종에서 SAM·FT-SAM·AD-SAM을 비교하고, COCO에서는 SAM·AD-SAM을 비교 평가했습니다.',
    ],
    process: [
      ['01', '문제 정의', '산업 이미지의 결함과 경계에 범용 세그멘테이션 모델을 적용할 때 나타나는 한계를 다뤘습니다.'],
      ['02', '도메인 적응', '사전학습된 SAM을 고정하고, 추가 모듈이 도메인 특성을 반영하도록 구성했습니다.'],
      ['03', '비교 평가', '공개 데이터셋별 분할 결과와 COCO 평가를 구분해 모델의 동작을 비교했습니다.'],
    ],
    resultTitle: '모델 설계에서 논문까지',
    results: [
      '「경량 Domain Adapter 기반 이상 탐지 특화 Segment Anything Model」의 제1저자로 연구를 정리했습니다.',
      'ThinObject, HRSOD, DIS, COIFT, MVTec-AD, VisA의 6개 공개 데이터셋을 평가에 사용했습니다.',
      '추가 학습 모듈의 역할과 기존 모델을 유지하는 설계 선택을 설명할 수 있는 연구 경험을 쌓았습니다.',
    ],
    scope: '이 페이지의 그림은 모델 구조를 설명하기 위한 도식입니다. 실제 추론 결과나 새로운 성능 측정값을 표시하지 않습니다.',
    takeaway: '범용 모델을 도메인에 적용할 때는, 어떤 지식을 유지하고 어떤 부분을 학습할지 구분하는 것이 설계의 출발점입니다.',
  },
  {
    id: 'edge-vision', number: '02', category: 'engineering', categoryLabel: 'ENGINEERING',
    title: '현장에서 이어지는\n영상 분석 시스템',
    shortTitle: '엣지 영상 분석 · 제품 개발과 운영',
    subtitle: 'Edge Vision / Product Engineering',
    description: '영상 수집과 공간 분석 기능을 구현하고, 현장 장치의 배포·모니터링·장애 대응을 수행했습니다.',
    tags: ['C++', 'OpenCV', 'GStreamer'],
    image: 'edge-system.svg', imageAlt: '카메라 영상이 엣지 처리, 로컬 저장, 서버 전송과 관제로 이어지는 개념 도식',
    color: 'blue', period: 'Addd · 2025.05 입사', role: '기능 개발 · 제품 통합 · 현장 운영',
    context: '영상 분석 기능은 현장 장치에서 지속적으로 실행되고, 생성된 데이터가 서버까지 전달되어야 합니다. 분석 로직과 함께 녹화·전송·배포·운영 과정의 문제를 다뤘습니다.',
    challenge: '분석 기능이 실제 데이터와 현장 장치에서 이어지게 만들기',
    contribution: [
      'C++·OpenCV·GStreamer 기반 예약 녹화와 영상 분할 저장 기능을 구현했습니다.',
      'SFTP 전송 재시도, 전송 실패 영상 보존, 녹화 상태를 고려한 재부팅 제어 로직을 구현했습니다.',
      '이동 경로·체류시간·관람 이벤트와 데이터 형식을 공통 제품의 기록·전송 흐름에 통합했습니다.',
      '현장 기기 설정·배포·모니터링을 수행하고, 기기 로그와 저장 결과를 대조해 데이터 이상을 조사했습니다.',
    ],
    process: [
      ['01', '수집과 전송', '예약 녹화, 분할 저장, 실패 영상 보존과 재시도 등 영상 수집 흐름을 구현했습니다.'],
      ['02', '분석 기능 통합', '공간 분석 데이터의 형식과 처리 흐름을 맞추고, 재시작 시 객체 ID가 이어지도록 로직을 개선했습니다.'],
      ['03', '현장 확인', '장치 상태, 전송 로그, 실제 저장 데이터를 비교하며 문제 범위를 좁히고 동료 개발자와 대응했습니다.'],
    ],
    resultTitle: '기능 구현과 운영을 함께 다룬 경험',
    results: [
      '전시 현장 장치 21대의 설정과 설치 모니터링·이슈 대응에 참여했습니다. 해당 수치는 한 현장의 설정 범위입니다.',
      '19개 카메라를 대상으로 Homography·BEV·ROI 기반 공간 분석 자료를 제작했습니다.',
      '자세 키포인트를 이용한 방향 근사 로직을 구현하고, 옆·뒷모습에서의 오류를 보완했습니다.',
    ],
    scope: '직접 구현한 기능과 공동으로 조사한 운영 이슈를 구분해 서술했습니다. 방향 추정은 자세 키포인트를 활용한 근사이며, 정밀한 안구 시선 측정이 아닙니다. 도식은 설명용으로 재구성했습니다.',
    takeaway: '프로그램이 실행 중이라는 사실과, 필요한 데이터가 정상적으로 생성·전달되고 있다는 사실을 함께 확인해야 합니다.',
  },
  {
    id: 'industrial-anomaly', number: '03', category: 'research', categoryLabel: 'RESEARCH',
    title: '적은 결함 데이터로\n시작하는 이상탐지',
    shortTitle: '타이어 결함 · 산업용 이상탐지',
    subtitle: 'Industrial Anomaly Detection',
    description: '데이터 수집과 라벨링부터 정상 패턴을 활용하는 이상탐지 모델 설계까지 참여했습니다.',
    tags: ['Python', 'Anomaly Detection', 'Coreset'],
    image: 'anomaly.svg', imageAlt: '정상 패턴의 대표 특징과 검사 대상 특징을 비교해 이상 영역을 찾는 개념 도식',
    color: 'sand', period: '2022.03 — 2023.02', role: '데이터 수집·라벨링 참여 · 모델 설계',
    context: '산업 검사에서는 결함 데이터가 충분하지 않고, 결함 유형별 데이터 수도 불균형할 수 있습니다. 타이어 검사 프로젝트에서 이런 제약을 다루기 위해 정상 패턴을 활용하는 이상탐지 접근을 적용했습니다.',
    challenge: '결함 데이터의 부족과 유형 간 불균형에 대응하기',
    contribution: [
      '공장을 방문해 전문가와 협력하며 타이어 데이터 수집과 라벨링에 참여했습니다.',
      '정상 데이터의 대표 특징을 저장하고 입력 특징과 비교하는 이상탐지 모델을 설계했습니다.',
      'Coreset을 활용해 정상 패턴의 대표 정보를 구성하고, 차이가 나타나는 영역을 탐지하는 접근을 다뤘습니다.',
    ],
    process: [
      ['01', '데이터 이해', '실제 수집 환경과 전문가의 라벨링 기준을 파악하며 검사 문제를 구체화했습니다.'],
      ['02', '정상 패턴 구성', '정상 샘플에서 추출한 특징을 대표 정보로 구성해 비교의 기준을 만들었습니다.'],
      ['03', '이상 영역 탐지', '입력 특징과 정상 패턴 사이의 차이를 이용해 결함 후보 영역을 찾는 모델을 설계했습니다.'],
    ],
    resultTitle: '데이터의 제약에서 방법을 선택한 경험',
    results: [
      '산업 현장의 데이터 수집과 라벨링 과정에 직접 참여했습니다.',
      '결함 예시를 충분히 확보하기 어려운 상황에서 이상탐지 방법론을 적용하는 경험을 쌓았습니다.',
      '이후 타이어 결함 라벨링 도구와 SAM 기반 세그멘테이션 연구로 문제의 범위를 확장했습니다.',
    ],
    scope: '산업용 원본 이미지와 비공개 데이터는 포함하지 않았습니다. 그림은 정상 특징과 이상 특징의 비교 개념을 보여주는 예시이며, 실제 검사 결과나 정확도 수치가 아닙니다.',
    takeaway: '모델을 선택하기 전에 어떤 데이터를 확보할 수 있고, 어떤 결함을 설명해야 하는지 먼저 이해해야 합니다.',
  },
];

export const skills = [
  { title: 'Vision & Research', description: '이상탐지 · 세그멘테이션 · 도메인 적응', tools: ['Python', 'PyTorch', 'SAM'] },
  { title: 'Edge & Systems', description: '영상 수집 · 전송 · 배포와 운영', tools: ['C++', 'OpenCV', 'GStreamer'] },
  { title: 'Spatial Analytics', description: '좌표 변환 · 영역 분석 · 이동 경로', tools: ['Homography', 'BEV', 'ROI'] },
];

export const timeline = [
  { year: '2025', label: 'ENGINEERING', title: 'Addd · AI 개발팀 연구원', text: '2025년 5월 입사. 영상 분석 소프트웨어 기능 개발, 공간 분석, 현장 장치 설정과 운영.' },
  { year: '2024', label: 'EDUCATION', title: '숭실대학교 · 소프트웨어학과 석사', text: '2024년 2월 졸업. 산업용 이상탐지와 도메인 적응 세그멘테이션 연구.' },
  { year: '2021', label: 'EDUCATION', title: '연세대학교 원주캠퍼스 · 학사', text: '컴퓨터정보통신공학과 졸업.' },
];
