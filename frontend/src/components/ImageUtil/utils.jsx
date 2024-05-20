// utils.js
export const loadFromLocalStorage = (key) => {
  const savedData = localStorage.getItem(key);
  return savedData ? JSON.parse(savedData) : null;
};

export const saveToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const formatTime = (timeInMs) => {
  const hours = Math.floor(timeInMs / 3600000);
  const minutes = Math.floor((timeInMs % 3600000) / 60000);
  const seconds = Math.floor((timeInMs % 60000) / 1000);
  return `${hours}h ${minutes}m ${seconds}s`;
};
