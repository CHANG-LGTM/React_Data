import { useNavigate } from "react-router-dom"; // react-router-dom에서 useNavigate 훅을 임포트하여 페이지 이동을 처리
import "./DiaryItem.css"; // DiaryItem 컴포넌트에 스타일을 적용할 CSS 파일 임포트
import { getEmotionImgById } from "../util"; // 감정 ID에 해당하는 이미지 URL을 가져오는 함수 임포트
import Button from "./Button"; // 버튼 컴포넌트 임포트
import React from "react"; // React 라이브러리 임포트

// DiaryItem 컴포넌트 정의
const DiaryItem = ({ id, emotionId, content, date }) => {
    const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수 사용

    // 상세 페이지로 이동하는 함수
    const goDetail = () => {
        navigate(`/diary/${id}`); // id를 이용해 해당 일기의 상세 페이지로 이동
    };

    // 수정 페이지로 이동하는 함수
    const goEdit = () => {
        navigate(`/edit/${id}`); // id를 이용해 해당 일기의 수정 페이지로 이동
    };

    return (
        <div className="DiaryItem">
            {/* 감정 아이콘을 클릭하면 goDetail 함수 실행 */}
            <div
                onClick={goDetail}
                className={["img_section", `img_section_${emotionId}`].join(" ")} // 감정 ID에 따라 스타일 적용
            >
                <img alt={`emotion${emotionId}`} src={getEmotionImgById(emotionId)} /> {/* 감정 이미지를 표시 */}
            </div>
            
            {/* 일기 정보 섹션 */}
            <div className="info_section">
                <div className="date_wrapper">
                    {new Date(parseInt(date)).toLocaleDateString()} {/* 날짜를 로컬 형식으로 표시 */}
                </div>
                <div className="content_wrapper">
                    {content.slice(0, 25)} {/* 내용의 첫 25자만 표시 */}
                </div>
            </div>

            {/* 수정 버튼 */}
            <div className="button_section">
                <Button onClick={goEdit} text={"수정하기"} /> {/* 수정 페이지로 이동하는 버튼 */}
            </div>
        </div>
    );
};

// 컴포넌트 최적화를 위해 React.memo로 감싸서 불필요한 리렌더링 방지
export default React.memo(DiaryItem);
