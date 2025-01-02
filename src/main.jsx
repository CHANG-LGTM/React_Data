// StrictMode는 React 애플리케이션에서 개발 모드에서 추가적인 경고와 검사를 활성화합니다.
import { StrictMode } from 'react'

// React 18에서 루트를 생성하기 위해 필요한 함수
import { createRoot } from 'react-dom/client'

// 전체 애플리케이션에 대한 기본 스타일을 포함한 CSS 파일
import './index.css'

// 메인 애플리케이션 컴포넌트
import App from './App.jsx'

// React 애플리케이션을 'root'라는 ID를 가진 DOM 요소에 렌더링
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 애플리케이션을 StrictMode로 감싸서 개발 중 경고와 오류를 더 엄격하게 처리 */}
    <App />
  </StrictMode>,
)
