import React, { useState, useEffect, useRef } from "react";
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
  const [concentrationLevel, setConcentrationLevel] = useState(100); // 집중도 상태 추가

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

  useEffect(() => {
    console.log("감지됨");
  }, [concentrationLevel]);

  // 주기적으로 로컬 스토리지 값을 확인하여 상태 업데이트
  useEffect(() => {
    const intervalId = setInterval(
      updateAverageConcentrationFromLocalStorage,
      1000
    );
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
      const concentration = prediction.find(
        (p) => p.className === "Concentration"
      );
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
          <Link
            to="/focus-analysis"
            className="m-5 outline-none custom-btn btn-1 text-xl">
            집중도 분석
          </Link>
          <Link
            to="/my-page"
            className="m-5 outline-none custom-btn btn-1 text-xl">
            마이페이지
          </Link>
        </div>
      </nav>
    );
  };

  const ConcentrationMessage = ({ averageConcentration }) => {
    if (averageConcentration >= 90) {
      return <div className="text-2xl ml-2">👍</div>;
    } else if (averageConcentration >= 50) {
      return <div className="text-2xl ml-2">👌</div>;
    } else {
      return <div className="text-2xl ml-2">👎</div>;
    }
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
            <CgProfile className="text-xl text-left" />
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
          <div className="flex w-100 gap-5" style={{ color: "black" }}>
            <div className="bg-sky-100 min-h-screen rounded-lg w-full px-5">
              <nav className="pt-8">
                <div>
                  <div className="flex text-center ml-10">
                    <div className="font-bold text-3xl ml-4">
                      {" "}
                      {date.getMonth() + 1} 월 {date.getDate()} 일
                    </div>
                    <h1 className="font-bold text-3xl text-counter pb-8 ml-4">
                      To Do List{" "}
                    </h1>
                  </div>
                  {/*<div className="border-l-2 border-solid border-gray-500 ml-3 mb-2"></div>*/}

                  <div className="text-center flex mb-6 ml-6">
                    <div className="text-center">
                      <div className="flex gap-2 text-2xl ml-8 font-bold text-blue-950">
                        누적 공부시간
                      </div>
                      <div className="ml-8 text-2xl font-bold">
                        <StopWatch concentrationLevel={concentrationLevel} />
                      </div>
                    </div>
                    <div className="border-l-2 border-solid border-gray-500 ml-3 mb-2"></div>
                    <div className="text-center">
                      <div className="flex gap-2 text-2xl ml-4 text-center font-bold text-blue-950">
                        평균 집중도
                      </div>
                      <div className="flex">
                        <div className="items-center ml-4 text-2xl font-bold">
                          {typeof averageConcentration === "number"
                            ? ` ${averageConcentration.toFixed(2)}%`
                            : averageConcentration}
                        </div>

                        <div className="mb-4 text-red-700 font-bold">
                          <ConcentrationMessage
                            averageConcentration={averageConcentration}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
                  height: "400px",
                  background: "black",
                }}>
                {isStudy && (
                  <ImageModel
                    className="rounded-full"
                    ref={imageModelRef}
                    preview={true}
                    size={400}
                    info={true}
                    interval={50}
                    handleStart={handleStart}
                    handleStop={handleStop}
                    onPredict={handlePredict}
                    model_url="https://teachablemachine.withgoogle.com/models/nFlJjJXF5/"
                    setGraphActive={setGraphActive}
                    setConcentrationLevel={setConcentrationLevel}
                  />
                )}
              </div>
              <div className="mt-6">
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
