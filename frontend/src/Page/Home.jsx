import React, { useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import axios from "axios";
import { useHistory } from "react-router-dom";

import Table from "../components/Table.jsx";
import TodoForm from "../components/TodoForm.jsx";
// import Cam from "../components/Cam.jsx";
import Profile from "../components/Profile.jsx";
import { FaHeartCirclePlus } from "react-icons/fa6";
import { useLocation } from "react-router-dom";
import PraciceCam from "../components/PraciceCam.jsx";

function Home() {
  const [user, setUser] = useState("로그인 필요");
  const [study, setStudy] = useState([]);
  const [durationTime, setDurationTime] = useState();
  const [isLoading, setisLoading] = useState(true);
  const location = useLocation();

  //로그인 버튼 시, 로그인 페이지로 전환
  const history = useHistory();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // 서버에서 받은 응답 데이터에서 사용자 이메일을 가져옴
      const email = location.state.email;
      console.log(email);

      // study_todo 가져오기 위한 axios
      const response = await axios.get("http://127.0.0.1:8000/api/study/", {
        params: {
          email: email,
        },
      });
      setUser(response.data.user);
      setDurationTime(response.data.total_duration_time);
      setStudy(response.data.feeds);
      console.log(response.data.feeds);

      setisLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const MenuBtn = () => {
    return (
      <nav className="menu" style={{ textAlign: "center" }}>
        <div>
          <button className="m-5 outline-none custom-btn btn-1 text-base">
            내 수업
          </button>
          <button className="m-5 outline-none custom-btn btn-1 text-base">
            집중도 분석
          </button>
          <button className="m-5 outline-none custom-btn btn-1 text-base">
            마이페이지
          </button>
        </div>
      </nav>
    );
  };

  return (
    <div>
      {/*머리*/}
      <div className="flex justify-between items-center">
        <div className="text-7xl font-bold">
          <h1>Learning Mate</h1>
        </div>
        <div>
          <div className="items-center">
            <CgProfile className="text-3xl text-right" />
          </div>
          <div>{user}</div>
        </div>
      </div>
      <hr />
      {/*메뉴바*/}
      <div className="p-2 bg-blue-950 text-white font-bold">
        <MenuBtn />
        {/*{user}*/}
      </div>
      <hr />

      {/*박스들*/}
      <div className="flex">
        <div className="bg-indigo-100 min-h-screen p-2 rounded-lg mt-4 w-1/2">
          <nav className="pt-8">
            <h1 className="font-bold text-5xl text-center pb-8">To Do List </h1>
          </nav>
          {/* Body */}
          <TodoForm user={user} setStudy={setStudy} fetchData={fetchData} />
          <div className="flex items-center text-2xl">
            <FaHeartCirclePlus className="text-rose-400" />
            <div className="ml-2 mt-5 mb-5 font-bold text-2xl">
              Total Study Time :{durationTime}
            </div>
          </div>
          <Table study={study} isLoading={isLoading} setStudy={setStudy} />
        </div>
        <div>
          <div>
            <PraciceCam />
          </div>
          <div className="rounded-lg box-border text-center border-black border-1 w-full p-60 mb-10">
            Graph
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
