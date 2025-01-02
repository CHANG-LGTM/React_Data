import { useEffect, useState } from "react";
import Button from "./Button";
import "./DiaryList.css";
import { useNavigate } from "react-router-dom";
import DiaryItem from "./DiaryItem";

// 정렬 옵션 리스트
const sortOptionList = [
    { value: "latest", name: "최신순" }, // 최신순 정렬
    { value: "oldest", name: "오래된 순" }, // 오래된 순 정렬
];

const DiaryList = ({ data }) => {
    // 상태 정의: 정렬 기준과 정렬된 데이터
    const [sortType, setSortType] = useState("latest");
    const [sortedData, setSortedData] = useState(data);

    // 정렬 기준 변경 핸들러
    const onChangeSortType = (e) => {
        setSortType(e.target.value);
    };

    // 페이지 이동을 위한 useNavigate 훅
    const navigate = useNavigate();

    // 새 일기 쓰기 버튼 클릭 시 새 페이지로 이동
    const onClickNew = () => {
        navigate("/new");
    };

    // 데이터나 정렬 기준이 변경될 때마다 데이터 정렬
    useEffect(() => {
        const compare = (a, b) => {
            if (sortType === "latest") {
                return Number(b.date) - Number(a.date); // 최신순 정렬
            } else {
                return Number(a.date) - Number(b.date); // 오래된 순 정렬
            }
        };

        // 데이터 복사 후 정렬
        const copyList = JSON.parse(JSON.stringify(data));
        copyList.sort(compare);
        setSortedData(copyList); // 정렬된 데이터를 상태에 반영
    }, [data, sortType]); // data나 sortType이 변경되면 실행

    return (
        <div className="DiaryList">
            <div className="menu_wrapper">
                <div className="left_col">
                    <select value={sortType} onChange={onChangeSortType}>
                        {sortOptionList.map((it, idx) => (
                            <option key={idx} value={it.value}>
                                {it.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="right_col">
                    <Button
                        type={"positive"}
                        text={"새 일기 쓰기"}
                        onClick={onClickNew}
                    />
                </div>
            </div>
            <div className="list_wrapper">
                {/* 정렬된 데이터를 기반으로 DiaryItem 컴포넌트 렌더링 */}
                {sortedData.map((it) => (
                    <DiaryItem key={it.id} {...it} />
                ))}
            </div>
        </div>
    );
};

export default DiaryList;
