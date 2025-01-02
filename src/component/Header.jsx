import "./Header.css";

const Header = ({ title, leftChild, rightChild }) => {
    return (
        <div className="Header">
            {/* 왼쪽 영역에 렌더링할 자식 컴포넌트 */}
            <div className="header_left">{leftChild}</div>
            {/* 제목 영역 */}
            <div className="header_title">{title}</div>
            {/* 오른쪽 영역에 렌더링할 자식 컴포넌트 */}
            <div className="header_right">{rightChild}</div>
        </div>
    );    
};

export default Header;
