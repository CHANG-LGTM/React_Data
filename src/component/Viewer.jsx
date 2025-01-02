import { emotionList } from "../util"; // 감정 목록을 임포트
import "./Viewer.css";

const Viewer = ({ content, emotionId }) => {
    // 전달된 emotionId에 맞는 감정 아이템 찾기
    const emotionItem = emotionList.find((it) => it.id === emotionId);

    return (
        <div className="Viewer">
            <section>
                {/* 오늘의 감정 섹션 */}
                <h4>오늘의 감정</h4>
                <div
                    className={[
                        "emotion_img_wrapper", // 기본 감정 이미지 스타일
                        `emotion_img_wrapper_${emotionId}`, // 감정 상태에 맞는 추가 클래스
                    ].join(" ")}
                >
                    <img alt={emotionItem.name} src={emotionItem.img} /> {/* 감정 아이템 이미지 */}
                    <div className="emotion_descript">{emotionItem.name}</div> {/* 감정 아이템 이름 */}
                </div>
            </section>
            <section>
                {/* 오늘의 일기 섹션 */}
                <h4>오늘의 일기</h4>
                <div className="content_wrapper">
                    <p>{content}</p> {/* 일기 내용 출력 */}
                </div>
            </section>
        </div>
    );
};

export default Viewer;
