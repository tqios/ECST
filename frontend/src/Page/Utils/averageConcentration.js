// src/utils/averageConcentration.js
import { saveToLocalStorage, loadFromLocalStorage } from './storage.js';

export const updateAverageConcentrationFromLocalStorage = (setAverageConcentration, LOCAL_STORAGE_KEY) => {
  const savedData = loadFromLocalStorage(LOCAL_STORAGE_KEY);
  if (savedData) {
    setAverageConcentration(savedData.average);
  } else {
    setAverageConcentration("오늘의 집중도 정보가 없습니다.");
  }
};

export const handlePredict = (prediction, graphActive, setDataPoints, setTotalConcentration, setConcentrationCount, setAverageConcentration, LOCAL_STORAGE_KEY) => {
  if (graphActive) {
    const concentration = prediction.find((p) => p.className === "Concentration");
    if (concentration) {
      const newConcentration = concentration.probability * 100;
      setDataPoints((prevPoints) => [...prevPoints, newConcentration]);

      setTotalConcentration((prevTotal) => {
        const newTotal = prevTotal + newConcentration;
        setConcentrationCount((prevCount) => {
          const newCount = prevCount + 1;
          const newAverage = newTotal / newCount;
          setAverageConcentration(newAverage);

          saveToLocalStorage(LOCAL_STORAGE_KEY, {
            average: newAverage,
            sum: newTotal,
            count: newCount,
          });

          return newCount;
        });

        return newTotal;
      });
    }
  }
};
