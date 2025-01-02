import React, { useEffect, useReducer, useRef, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Diary from "./pages/Diary";
import Edit from "./pages/Edit";
import Home from "./pages/Home";
import New from "./pages/New";

// 모의 데이터를 생성합니다.
const mockData = [
  {
    id: "mock1",
    date: new Date().getTime() - 1,
    content: "mock1",
    emotionId: 1,
  },
  {
    id: "mock2",
    date: new Date().getTime() - 2,
    content: "mock2",
    emotionId: 2,
  },
  {
    id: "mock3",
    date: new Date().getTime() - 3,
    content: "mock3",
    emotionId: 3,
  },
];

// 리듀서 함수 정의
function reducer(state, action) {
  switch (action.type) {
    case "INIT": {
      // INIT 액션 시, 로컬 저장소의 데이터를 초기화
      return action.data;
    }
    case "CREATE": {
      // CREATE 액션 시, 새 데이터 추가
      const newState = [action.data, ...state];
      localStorage.setItem("diary", JSON.stringify(newState));
      return newState;
    }
    case "UPDATE": {
      // UPDATE 액션 시, 기존 데이터 수정
      const newState = state.map((it) =>
        String(it.id) === String(action.data.id) ? { ...action.data } : it
      );
      localStorage.setItem("diary", JSON.stringify(newState));
      return newState;
    }
    case "DELETE": {
      // DELETE 액션 시, 특정 데이터 삭제
      const newState = state.filter((it) => String(it.id) !== String(action.targetId));
      localStorage.setItem("diary", JSON.stringify(newState));
      return newState;
    }
    default: {
      return state;
    }
  }
}

// Context 정의: 일기 데이터를 제공
export const DiaryStateContext = React.createContext();
// Context 정의: 일기 데이터를 수정할 dispatch 함수 제공
export const DiaryDispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []); // 리듀서를 사용해 상태 관리
  const [isDataLoaded, setIsDataLoaded] = useState(false); // 데이터 로딩 상태
  const idRef = useRef(0); // 새로운 ID를 위한 ref

  useEffect(() => {
    const rawData = localStorage.getItem("diary"); // 로컬 스토리지에서 데이터 가져오기
    if (!rawData) {
      setIsDataLoaded(true);
      return;
    }
    const localData = JSON.parse(rawData); // JSON 파싱
    if (localData.length === 0) {
      setIsDataLoaded(true);
      return;
    }
    localData.sort((a, b) => Number(b.id) - Number(a.id)); // ID 기준 내림차순 정렬
    idRef.current = localData[0].id + 1; // ID 값을 업데이트
    dispatch({ type: "INIT", data: localData }); // 초기 데이터 로드
    setIsDataLoaded(true);
  }, []);

  // 새로운 일기 추가 함수
  const onCreate = (date, content, emotionId) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current,
        date: new Date(date).getTime(),
        content,
        emotionId,
      },
    });
    idRef.current += 1; // ID 증가
  };

  // 일기 수정 함수
  const onUpdate = (targetId, date, content, emotionId) => {
    dispatch({
      type: "UPDATE",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotionId,
      },
    });
  };

  // 일기 삭제 함수
  const onDelete = (targetId) => {
    dispatch({
      type: "DELETE",
      targetId,
    });
  };

  // 데이터가 로딩되지 않았으면 로딩 화면 출력
  if (!isDataLoaded) {
    return <div>데이터를 불러오는 중입니다.</div>;
  } else {
    return (
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider
          value={{
            onCreate,
            onUpdate,
            onDelete,
          }}
        >
          <div className="App">
            <Router>
              <Routes>
                {/* 각 페이지 라우팅 설정 */}
                <Route path="/" element={<Home />} />
                <Route path="/new" element={<New />} />
                <Route path="/diary/:id" element={<Diary />} />
                <Route path="/edit/:id" element={<Edit />} />
              </Routes>
            </Router>
          </div>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    );
  }
}

export default App;
