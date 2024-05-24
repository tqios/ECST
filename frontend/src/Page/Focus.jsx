import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MenuNav from "../components/MenuNav.jsx";
import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { Link, useHistory, useLocation } from "react-router-dom";
import { getRecordConcentrate } from "./Utils/api";

function Focus() {
  const [user, setUser] = useState("-");
  const [isLoading, setisLoading] = useState(true);
  const [concentrateRecord, setConcentrateRecord] = useState([]);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const userEmail = localStorage.getItem("user_email");
    if (userEmail) {
      setUser(userEmail);
    } else {
      history.push("/login");
    }
  }, [history]);

  useEffect(() => {
    const fetchConcentrateRecord = async () => {
      try {
        if (user !== "로그인 필요") {
          const result = await getRecordConcentrate(user);
          console.log(result);
          setConcentrateRecord(result);
        }
      } catch (e) {
        alert("공부기록이 없거나, 사용자가 유용하지 않습니다.");
        console.log(e.message);
      }
    };

    fetchConcentrateRecord();
  }, [user]);

  const Calendar = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    return (
      <DatePicker
        dateFormat="yyyy.MM.dd"
        shouldCloseOnSelect={true}
        minDate={new Date("2000-01-01")}
        maxDate={new Date()}
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
              email: location.state?.email || localStorage.getItem("user_email"),
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
                email: location.state?.email || localStorage.getItem("user_email"),
              },
            }}>
            {user}
          </Link>
        </div>
      </div>
      <hr />
      <div className="p-2 bg-sky-300 text-white font-bold">
        <MenuNav />
      </div>
      <hr />

      <div className="flex">
        <div className="ml-10 mt-6">
          날짜 선택 :
          <Calendar />
        </div>
        <div className="ml-12 mt-5 text-ml">
          <table className="table-auto w-full border-collapse border border-gray-300 shadow-md rounded-lg">
            <thead>
              <tr className="bg-white">
                <th className="border border-gray-300 px-4 py-2">날짜</th>
                <th className="border border-gray-300 px-4 py-2">공부시간</th>
                <th className="border border-gray-300 px-4 py-2">집중도</th>
              </tr>
            </thead>
            <tbody>
              {concentrateRecord.map((record, index) => (
                <tr className="bg-white hover:bg-gray-100 text-center" key={record.concentrate_date}>
                  <td className="border border-gray-300 px-4 py-2">{record.concentrate_date}</td>
                  <td className="border border-gray-300 px-4 py-2">{record.concentrate_time}</td>
                  <td className="border border-gray-300 px-4 py-2">{record.concentrate_average_value}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Focus;
