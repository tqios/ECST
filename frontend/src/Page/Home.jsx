import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import { CgProfile } from "react-icons/cg";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import TodoForm from "../components/TodoForm.jsx";
import { useLocation } from "react-router-dom";
import Todo from "../components/Todo.jsx";
import Graph from "../components/Graph.jsx";
import { ImageModel, CategoryImageModel } from "../components/index.ts";
import StopWatch from "../components/StopWatch.jsx";
import { useSelector } from "react-redux";

const loadFromLocalStorage = (key) => {
  const savedData = localStorage.getItem(key);
  return savedData ? JSON.parse(savedData) : null;
};

const saveToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

function Home() {
  const [user, setUser] = useState("로그인 필요");
  const [study, setStudy] = useState([]);
  const [durationTime, setDurationTime] = useState();
  const [isLoading, setisLoading] = useState(true);
  const location = useLocation();
  const [isDay, setIsDay] = React.useState(true);
  const date = new Date();

  // 집중도 데이터
  const [dataPoints, setDataPoints] = useState([]);
  // 그래프 업데이트 활성화 상태
  const [graphActive, setGraphActive] = useState(true);
  const [averageConcentration, setAverageConcentration] = useState(0);
  const [totalConcentration, setTotalConcentration] = useState(0);
  const [concentrationCount, setConcentrationCount] = useState(0);

  // 로그인 버튼 시, 로그인 페이지로 전환
  const history = useHistory();
  const [stream, setStream] = useState(false);
  const [isNear, setIsNear] = React.useState(false);
  const isStudy = useSelector((state) => state.todoModifier.isStudy);

  const imageModelRef = useRef(null);

  const LOCAL_STORAGE_KEY = "average_concentration_data";

  // 로컬 스토리지에서 데이터 불러와 상태 업데이트
  const updateAverageConcentrationFromLocalStorage = () => {
    const savedData = loadFromLocalStorage(LOCAL_STORAGE_KEY);
    if (savedData) {
      setAverageConcentration(savedData.average);
    } else {
      setAverageConcentration("오늘의 집중도 정보가 없습니다.");
    }
  };

  useEffect(() => {
    fetchData();
    updateAverageConcentrationFromLocalStorage();
  }, [graphActive]);

  // 주기적으로 로컬 스토리지 값을 확인하여 상태 업데이트
  useEffect(() => {
    const intervalId = setInterval(updateAverageConcentrationFromLocalStorage, 1000);
    return () => clearInterval(intervalId);
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
        // setStudy([]);
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

  const handlePredict = (prediction) => {
    if (graphActive) {
      const concentration = prediction.find((p) => p.className === "Concentration");
      if (concentration) {
        const newConcentration = concentration.probability * 100;
        setDataPoints((prevPoints) => [...prevPoints, newConcentration]);

        // 총 집중도와 카운트를 업데이트하여 평균 계산
        setTotalConcentration((prevTotal) => {
          const newTotal = prevTotal + newConcentration;
          setConcentrationCount((prevCount) => {
            const newCount = prevCount + 1;
            const newAverage = newTotal / newCount;
            setAverageConcentration(newAverage);

            // 로컬 스토리지에 저장
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

  const handleStart = () => {
    setDataPoints([]); // 그래프 데이터 리셋
    setGraphActive(true); // 그래프 활성화
    if (imageModelRef.current) {
      imageModelRef.current.start(); // Start the model
    }
  };

  const handleStop = () => {
    setGraphActive(false); // 그래프 업데이트 비활성화
    setDataPoints([]); // 그래프 데이터 초기화
    if (imageModelRef.current) {
      imageModelRef.current.stop(); // Stop the model
    }
  };

  const MenuBtn = () => {
    return (
      <nav className="menu" style={{ textAlign: "center" }}>
        <div>
          <Link to="/" className="m-5 outline-none custom-btn btn-1 text-xl">
            홈
          </Link>
          <Link to="/focus-analysis" className="m-5 outline-none custom-btn btn-1 text-xl">
            집중도 분석
          </Link>
          <Link to="/my-page" className="m-5 outline-none custom-btn btn-1 text-xl">
            마이페이지
          </Link>
        </div>
      </nav>
    );
  };

  return (
    <div>
      {/* 머리 */}
      <div className="flex justify-between items-center">
        <div className="text-5xl font-bold ml-6">
          <h1>Learning Mate</h1>
        </div>
        <div style={{ textAlign: "center", margin: "10px", marginTop: "30px" }}>
          <div
            className="items-center"
            style={{ marginLeft: "auto", marginRight: "auto", width: "50%" }}>
            <CgProfile className="text-3xl text-left" />
          </div>
          <div onClick={handletologin}>{user}</div>
        </div>
      </div>
      <hr />
      {/* 메뉴바 */}
      <div className="p-2 bg-sky-300 text-white font-bold">
        <MenuBtn />
      </div>
      <hr />

      {/* 박스들 */}

      <div className="flex w-100">
        <div className="bg-white min-h-screen p-2 rounded-lg mt-4 w-100 m-auto">
          <div className="ml-2 mt-5 mb-5 font-bold text-3xl">

             {date.getMonth()+1} 월 {date.getDate()} 일
            <div className="flex">누적 공부시간 :<StopWatch /></div>
              {/*누적 공부시간 :<StopWatch />*/}
            {/* <StopWatch />
            누적 공부시간 :{durationTime} */}

            <p>
              Today's Average Concentration:
              {typeof averageConcentration === 'number'
                  ? `${averageConcentration.toFixed(2)}%`
                  : averageConcentration}
            </p>
          </div>

          <div className="flex w-100 gap-5" style={{ color: "black" }}>
            <div className="bg-sky-100 min-h-screen rounded-lg w-full px-5">
              <nav className="pt-8">
                <h1 className="font-bold text-3xl text-left pb-8 ml-4">
                  To Do List{" "}
                </h1>

              </nav>
              {/* Body */}
              <TodoForm user={user} setStudy={setStudy} fetchData={fetchData} />
              <Todo study={study} isLoading={isLoading} setStudy={setStudy} />
            </div>
            <div>
              <div
                className="rounded-lg mb-3"
                style={{
                  width: "400px",
                  height: "300px",
                  background: "blue",
                }}>
                {isStudy && (
                  <ImageModel
                    ref={imageModelRef}
                    preview={true}
                    size={300}
                    info={true}
                    interval={50}
                    handleStart={handleStart}
                    handleStop={handleStop}
                    onPredict={handlePredict}
                    model_url="https://teachablemachine.withgoogle.com/models/nFlJjJXF5/"
                    setGraphActive={setGraphActive}
                  />
                )}
              </div>
              <div>
                <Graph dataPoints={dataPoints} active={setGraphActive}></Graph>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
