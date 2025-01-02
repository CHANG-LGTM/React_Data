import React from "react";
import "./EmotionItem.css";

const EmotionItem = ({ id, img, name, onClick, isSelected }) => {
    // 클릭 시 onClick 콜백 호출 (감정 아이템 ID 전달)
    const handleOnClick = () => {
        onClick(id);
    }

    return (
        <div className={[
            "EmotionItem", // 기본 EmotionItem 클래스
            isSelected ? `EmotionItem_on_${id}` : `EmotionItem_off` // 선택 상태에 따른 동적 클래스 추가
        ].join(" ")}
            onClick={handleOnClick} // 클릭 시 handleOnClick 실행
        >          
            <img alt={`emotion${id}`} src={img} /> {/* 감정 아이템 이미지 */}
            <span>{name}</span> {/* 감정 아이템 이름 */}
        </div>
    );
};

// React.memo로 감싸서 불필요한 리렌더링 방지
export default React.memo(EmotionItem);
