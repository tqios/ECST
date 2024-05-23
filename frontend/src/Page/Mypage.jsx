import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MenuNav from "../components/MenuNav.jsx";
import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import axios from "axios";
import { Link, useHistory, useLocation } from "react-router-dom";

function Mypage() {
  const [user, setUser] = useState("로그인 필요");
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

  const handleLogout = () => {
    localStorage.removeItem("user_email");
    history.push("/login");
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
      {/* 메뉴바 */}
      <div className="p-2 bg-sky-300 text-white font-bold">
        <MenuNav />
      </div>
      <hr />
      {/* 하위 컨텐츠 시작 */}
      <div className="flex justify-center items-center mt-4">
        <button
          onClick={handleLogout}
          className="text-xl font-bold p-2 m-10 bg-gray-400 text-white rounded">
          로그아웃
        </button>
      </div>
    </div>
  );
}

export default Mypage;
