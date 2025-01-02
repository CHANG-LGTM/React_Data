import emotion1 from "./img/emotion1.png";
import emotion2 from "./img/emotion2.png";
import emotion3 from "./img/emotion3.png";
import emotion4 from "./img/emotion4.png";
import emotion5 from "./img/emotion5.png";

// emotionId에 맞는 감정 이미지를 반환하는 함수
export const getEmotionImgById = (emotionId) => {
    const targetEmotionId = String(emotionId);  // emotionId를 문자열로 변환
    switch(targetEmotionId){
        case "1":  // 감정 ID 1에 해당하는 이미지를 반환
            return emotion1;
        case "2":  // 감정 ID 2에 해당하는 이미지를 반환
            return emotion2;
        case "3":  // 감정 ID 3에 해당하는 이미지를 반환
            return emotion3;
        case "4":  // 감정 ID 4에 해당하는 이미지를 반환
            return emotion4;
        case "5":  // 감정 ID 5에 해당하는 이미지를 반환
            return emotion5;
        default:  // 유효하지 않은 감정 ID가 들어온 경우 null 반환
            return null;
    }
}

// 날짜를 "YYYY-MM-DD" 형식으로 반환하는 함수
export const getFormattedDate = (targetDate) => {
    let year = targetDate.getFullYear();  // 연도
    let month = targetDate.getMonth() + 1;  // 월 (0부터 시작하므로 1을 더해줌)
    let date = targetDate.getDate();  // 일

    // 월과 일이 한 자리 수일 경우 0을 추가하여 두 자리 수로 만듦
    if(month < 10){
        month = `0${month}`;
    }
    if(date < 10){
        date = `0${date}`;
    }
    
    // "YYYY-MM-DD" 형식으로 반환
    return `${year}-${month}-${date}`;
};

// 감정 목록을 담은 배열
export const emotionList = [
    {
        id: 1,  // 감정 ID
        name: "완전 좋음",  // 감정 이름
        img: getEmotionImgById(1),  // 해당 감정의 이미지
    },
    {
        id: 2,
        name: "좋음",
        img: getEmotionImgById(2),
    },
    {
        id: 3,
        name: "그럭저럭",
        img: getEmotionImgById(3),
    },
    {
        id: 4,
        name: "나쁨",
        img: getEmotionImgById(4),
    },
    {
        id: 5,
        name: "끔찍함",
        img: getEmotionImgById(5),
    },
];

// 주어진 날짜를 기준으로 해당 월의 시작과 끝 시간을 반환하는 함수
export const getMonthRangeByDate = (date) => {
    // 해당 월의 첫 날의 타임스탬프 (00:00:00)
    const beginTimeStamp = new Date(date.getFullYear(), date.getMonth(), 1).getTime();
    // 해당 월의 마지막 날의 타임스탬프 (23:59:59)
    const endTimeStamp = new Date(
        date.getFullYear(),
        date.getMonth() + 1,  // 다음 달의 첫 날
        0,  // 마지막 날
        23, 59, 59  // 끝 시간
    ).getTime();
    
    // 시작과 끝 타임스탬프를 객체로 반환
    return { beginTimeStamp, endTimeStamp };
}
