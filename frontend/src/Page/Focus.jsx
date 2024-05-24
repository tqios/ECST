import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MenuNav from "../components/MenuNav.jsx";
import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import axios from "axios";
import { Link, useHistory, useLocation } from "react-router-dom";

function Focus() {
  const [user, setUser] = useState("-");
  const [isLoading, setisLoading] = useState(true);
  const [study, setStudy] = useState([]);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const userEmail = localStorage.getItem("user_email");
    if (userEmail) {
      fetchData(userEmail);
    } else {
      history.push("/login");
    }
  }, []);

  const fetchData = async (email) => {
    try {
      console.log(email);

      // study_todo 가져오기 위한 axios
      const response = await axios.get("http://127.0.0.1:8000/api/study/", {
        params: {
          email: email,
        },
      });
      setUser(response.data.user);

      console.log(response.data.feeds);
      await setStudy(response.data.feeds);
      setisLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const Calendar = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    return (
      <DatePicker
        dateFormat="yyyy.MM.dd" // 날짜 형태
        shouldCloseOnSelect={true} // 날짜를 선택하면 datepicker가 자동으로 닫힘
        minDate={new Date("2000-01-01")} // minDate 이전 날짜 선택 불가
        maxDate={new Date()} // maxDate 이후 날짜 선택 불가
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
      />
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <Link
          to={{
            pathname: "/home",
            state: {
              email:
                location.state?.email || localStorage.getItem("user_email"),
            },
          }}
          className="text-5xl font-bold ml-6">
          <h1>Learning Mate</h1>
        </Link>
        <div style={{ textAlign: "center", margin: "10px", marginTop: "30px" }}>
          <div
            className="items-center"
            style={{ marginLeft: "auto", marginRight: "auto", width: "50%" }}>
            <CgProfile className="text-xl text-left" />
          </div>
          <Link
            to={{
              pathname: "/my-page",
              state: {
                email:
                  location.state?.email || localStorage.getItem("user_email"),
              },
            }}>
            {user}
          </Link>
        </div>
      </div>
      <hr />
      {/*메뉴바*/}
      <div className="p-2 bg-sky-300 text-white font-bold">
        <MenuNav />
        {/*{user}*/}
      </div>
      <hr />

      <div className="flex">
        <div className="ml-10 mt-6">
          날짜 선택 :
          <Calendar />
        </div>
        <div className="ml-12 mt-5  text-ml">
          <table className="table-auto w-full border-collapse border border-gray-300 shadow-md rounded-lg">
            <thead>
              <tr className="bg-white">
                <th className="border border-gray-300 px-4 py-2">날짜</th>
                <th className="border border-gray-300 px-4 py-2">공부시간</th>
                <th className="border border-gray-300 px-4 py-2">집중도</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white hover:bg-gray-100 text-center">
                <td className="border border-gray-300 px-4 py-2">5월 20일</td>
                <td className="border border-gray-300 px-4 py-2">0:46:12</td>
                <td className="border border-gray-300 px-4 py-2">97%</td>
              </tr>
              <tr className="bg-gray-50 hover:bg-gray-100 text-center">
                <td className="border border-gray-300 px-4 py-2">5월 21일</td>
                <td className="border border-gray-300 px-4 py-2">1:47:20</td>
                <td className="border border-gray-300 px-4 py-2">56.5%</td>
              </tr>
              <tr className="bg-white hover:bg-gray-100 text-center">
                <td className="border border-gray-300 px-4 py-2">5월 22일</td>
                <td className="border border-gray-300 px-4 py-2">0:10:00</td>
                <td className="border border-gray-300 px-4 py-2">10.1%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Focus;
