import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Editor.css";
import { emotionList, getFormattedDate } from "../util"; // 유틸리티 함수와 데이터 임포트
import Button from "./Button"; // Button 컴포넌트 임포트
import EmotionItem from "./EmotionItem"; // EmotionItem 컴포넌트 임포트

const Editor = ({ initData, onSubmit }) => {

    const navigate = useNavigate();

    // 뒤로 가기 버튼 클릭 시 이전 페이지로 이동
    const handleOnGoBack = () => {
        navigate(-1);
    }

    // 상태 초기화: 날짜, 감정, 내용
    const [state, setState] = useState({
        date: getFormattedDate(new Date()), // 현재 날짜를 포맷하여 설정
        emotionId: 3, // 기본 감정 설정 (감정 ID 3)
        content: "", // 기본 내용 비어 있음
    });

    // initData가 있을 경우 초기 데이터를 설정
    useEffect(() => {
        if(initData){
            setState({
                ...initData, // 기존 데이터를 상태에 반영
                date: getFormattedDate(new Date(parseInt(initData.date))), // 날짜 포맷 적용
            });
        }
    },[initData]);

    // 날짜 변경 핸들러
    const handleChangeDate = (e) => {
        setState({
            ...state,
            date: e.target.value,
        });
    };

    // 내용 변경 핸들러
    const handleChangeContent = (e) => {
        setState({
            ...state,
            content: e.target.value,
        });
    };

    // 작성 완료 시 onSubmit 호출
    const handleSubmit = () => {
        onSubmit(state);
    };

    // 감정 선택 변경 핸들러 (useCallback으로 최적화)
    const handleChangeEmotion = useCallback ((emotionId) => {
        setState((state)=>({
            ...state,
            emotionId, // 선택된 감정 ID 업데이트
        }));
    },[]);

    return (
        <div className="Editor">
            <div className="editor_section">
                {/* 날짜 입력 */}
                <h4>오늘의 날짜</h4>
                <div className="input_wrapper">
                    <input type="date" value={state.date}
                        onChange={handleChangeDate} /> {/* 날짜 선택 */}
                </div>
            </div>
            <div className="editor_section">
                {/* 감정 선택 */}
                <h4>오늘의 감성</h4>
                <div className="input_wrapper emotion_list_wrapper">
                    {emotionList.map((it) => (
                        <EmotionItem 
                            key={it.id}
                            {...it} // 감정 아이템의 데이터 전달
                            onClick={handleChangeEmotion} // 감정 클릭 시 핸들러
                            isSelected={state.emotionId === it.id} // 선택된 감정 표시
                        />
                    ))}
                </div>
            </div>
            <div className="editor_section">
                {/* 일기 내용 입력 */}
                <h4>오늘의 일기</h4>
                <div className="input_wrapper">
                    <textarea placeholder="오늘은 어땠나요?" value={state.content} onChange={handleChangeContent} />
                </div>
            </div>
            <div className="editor_section bottom_section">
                {/* 버튼들 */}
                <Button text={"취소하기"} onClick={handleOnGoBack}/> {/* 취소 버튼 */}
                <Button text={"작성 완료"} type={"positive"} onClick={handleSubmit} /> {/* 제출 버튼 */}
            </div>  
        </div>
    );
}

export default Editor;
