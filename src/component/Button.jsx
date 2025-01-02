import "./Button.css"; // CSS 파일을 임포트하여 버튼 스타일을 적용

// Button 컴포넌트 정의
const Button = ({ text, type, onClick }) => {
    // type이 'positive' 또는 'negative'이면 해당 type을 사용하고, 그렇지 않으면 'default'로 설정
    const btnType = ["positive", "negative"].includes(type) ? type : "default";
    
    return (
        // 버튼의 클래스명을 동적으로 설정: 기본 클래스명 + btnType에 맞는 클래스명
        <button className={["Button", `Button_${btnType}`].join(" ")} 
                onClick={onClick} // 클릭 시 onClick 함수 실행
        >
            {text} {/* 버튼에 표시할 텍스트 */}
        </button>
    );
}

export default Button;
