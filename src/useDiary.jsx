import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "./App";  // Diary 상태를 가져오기 위한 context
import { useNavigate } from "react-router-dom";  // 페이지 이동을 위한 useNavigate 훅

// 주어진 일기 ID에 해당하는 일기를 찾아 반환하는 커스텀 훅
const useDiary = (id) => {
    // DiaryStateContext에서 전체 일기 데이터 가져오기
    const data = useContext(DiaryStateContext);
    const [diary, setDiary] = useState();  // 찾은 일기를 저장할 상태
    const navigate = useNavigate();  // navigate 훅을 사용해 페이지 이동 처리

    useEffect(() => {
        // data 배열에서 주어진 id에 맞는 일기를 찾음
        const matchDiary = data.find((it) => String(it.id) === String(id));
        
        if (matchDiary) {
            // 일기를 찾은 경우 상태에 저장
            setDiary(matchDiary);
        } else {
            // 일기가 존재하지 않으면 경고 메시지 출력 후 홈으로 리디렉션
            alert("일기가 존재하지 않습니다.");
            navigate("/", { replace: true });  // 홈으로 이동, history를 남기지 않음
        }
    }, [id, data]);  // id 또는 data가 변경될 때마다 다시 실행

    return diary;  // 찾은 일기를 반환
};

export default useDiary;
