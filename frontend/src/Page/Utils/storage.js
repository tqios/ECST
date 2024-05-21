// Page/utils/storage.js
export const loadFromLocalStorage = (key) => {
  const savedData = localStorage.getItem(key);
  return savedData ? JSON.parse(savedData) : null;
};

export const saveToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const clearLocalStorage = (key) => {
  localStorage.removeItem(key);
};

