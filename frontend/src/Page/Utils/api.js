// src/utils/api.js
import axios from "axios";
import { clearLocalStorage } from "./storage";


export const fetchData = async (email, setUser, setStudy, setisLoading, history, location) => {
  try {
    if (location.state && location.state.email) {
      const response = await axios.get("http://127.0.0.1:8000/api/study/", {
        params: {
          email: email,
        },
      });
      setUser(response.data.user);
      await setStudy(response.data.feeds);
      setisLoading(false);
    } else {
      setUser("로그인 필요");
      setisLoading(true);
      if (!location.state || !location.state.email) {
        history.push("/login");
      }
    }
  } catch (error) {
    console.log(error);
  }
};


// 이거 수정해야됨
export const saveDataToDatabase = async (data) => {
  try {
    await axios.post("http://127.0.0.1:8000/api/save_concentration_data/", data);
    console.log("Data saved successfully");
  } catch (error) {
    console.error("Error saving data to database", error);
  }
};
