import { saveToLocalStorage, loadFromLocalStorage } from "./storage.js";

export const updateAverageConcentrationFromLocalStorage = (
  setAverageConcentration,
  LOCAL_STORAGE_KEY
) => {
  const savedData = loadFromLocalStorage(LOCAL_STORAGE_KEY);
  if (savedData) {
    setAverageConcentration(savedData.average);
    //console.log("이전 기록 : ", savedData);
  } else {
    setAverageConcentration("오늘의 집중도 정보가 없습니다.");
  }
};

export const handlePredict = (
  prediction,
  graphActive,
  setDataPoints,
  setTotalConcentration,
  setConcentrationCount,
  setAverageConcentration,
  LOCAL_STORAGE_KEY
) => {
  if (graphActive) {
    const concentration = prediction.find(
      (p) => p.className === "Concentration"
    );
    if (concentration) {
      // 새로운 집중도 데이터 배열에 추가
      const newConcentration = concentration.probability * 100;
      setDataPoints((prevPoints) => [...prevPoints, newConcentration]);

      // 로컬 스토리지에서 이전 데이터를 불러오기
      const savedData = loadFromLocalStorage(LOCAL_STORAGE_KEY) || {
        sum: 0,
        count: 0,
      };
      const prevTotal = savedData.sum;
      const prevCount = savedData.count;

      // 총 집중도 및 카운트 업데이트
      const newTotal = prevTotal + newConcentration;
      const newCount = prevCount + 1;
      const newAverage = newTotal / newCount;

      // 새로운 상태 업데이트
      setTotalConcentration(newTotal);
      setConcentrationCount(newCount);
      setAverageConcentration(newAverage);

      // 로컬 스토리지에 저장
      saveToLocalStorage(LOCAL_STORAGE_KEY, {
        average: newAverage,
        sum: newTotal,
        count: newCount,
      });
    }
  }
};
