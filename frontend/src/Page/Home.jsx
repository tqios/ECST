import React, { useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Provider } from "react-redux";
import Table from "../components/Table.jsx";
import TodoForm from "../components/TodoForm.jsx";
import Store from "../TodoRedux/Store.jsx";
import { FaHeartCirclePlus } from "react-icons/fa6";
import { useLocation } from "react-router-dom";
import PracticeCam from "../components/PracticeCam.jsx";
import TeachableMachineModel from "../components/Image.jsx"
import Todo from "../components/Todo.jsx";
import {ImageModel} from '../components/index';


function Home() {
  const [user, setUser] = useState("로그인 필요");
  const [study, setStudy] = useState([]);
  const [durationTime, setDurationTime] = useState();
  const [isLoading, setisLoading] = useState(true);
  const location = useLocation();
  const [isDay, setIsDay] = React.useState(true);

  //로그인 버튼 시, 로그인 페이지로 전환
  const history = useHistory();
  const [stream, setStream] = useState(false);
    const [isNear, setIsNear] = React.useState(false);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      if (location.state && location.state.email) {
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

        console.log(response.data.feeds);
        await setStudy(response.data.feeds);
        setisLoading(false);
      } else {
        // 로그인 필요한 경우
        setUser("로그인 필요");
        //setStudy([]);
        setisLoading(true);
        if (!location.state || !location.state.email) {
          history.push("/login");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handletologin = () => {
    history.push("/login");
  };

  const MenuBtn = () => {
    return (
      <nav className="menu" style={{ padding: '0px', textAlign: "center" }}>
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
          <h1 style={{ margin: '20px' }}>Learning Mate</h1>
        </div>
        <div style={{ textAlign: 'center', margin: '10px', marginTop: '30px' }}>
          <div className="items-center" style={{ marginLeft: 'auto', marginRight: 'auto', width: '50%' }}>
            <CgProfile className="text-3xl text-left" />
          </div>
          <div onClick={handletologin}>{user}</div>
        </div>
      </div>
      <hr />
      {/*메뉴바*/}
      <div className="bg-blue-950 text-white font-bold">
        <MenuBtn />
        {/*{user}*/}
      </div>
      <hr />

      {/*박스들*/}
      <div className="flex" style={{ color: 'black' }}>
        <div className="bg-indigo-100 min-h-screen p-2 mt-0 w-1/2">
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
          <Todo study={study} isLoading={isLoading} setStudy={setStudy} />
        </div>
        <div>
          <div>
             <ImageModel
        preview={true}
        size={200}
        info={true}
        interval={500}
        onPredict={(prediction)=>{
          console.log(prediction[0].probability);
        }}
        model_url="https://teachablemachine.withgoogle.com/models/IiLG2OMFg/"></ImageModel>
          </div>
          <div>Graph</div>
        </div>
      </div>
    </div>
  );
}

export default Home;
