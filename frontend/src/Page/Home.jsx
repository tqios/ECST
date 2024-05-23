import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import { CgProfile } from "react-icons/cg";
import { Link, useHistory } from "react-router-dom";
import MenuNav from "../components/MenuNav.jsx";
import TodoForm from "../components/TodoForm.jsx";
import { useLocation } from "react-router-dom";
import Todo from "../components/Todo.jsx";
import Graph from "../components/Graph.jsx";
import { ImageModel, CategoryImageModel } from "../components/index.ts";
import StopWatch from "../components/StopWatch.jsx";
import { useSelector } from "react-redux";
import { fetchData, saveRecordConcentrate } from "./Utils/api";
import {
  updateAverageConcentrationFromLocalStorage,
  handlePredict,
} from "./Utils/averageConcentration";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
  clearLocalStorage,
} from "./Utils/storage";

function Home() {
  const [user, setUser] = useState("로그인 필요");
  const [study, setStudy] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const location = useLocation();
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
  const isStudy = useSelector((state) => state.todoModifier.isStudy);
  const imageModelRef = useRef(null);
  const LOCAL_STORAGE_KEY = "average_concentration_data";
  const LAST_SAVE_DATE_KEY = "last_save_date";
  const TIMER_TIME = "timerTime";

  useEffect(() => {
    // 이메일이 없으면 로그인 페이지로 리다이렉트
    if (!location.state?.email) {
      history.push("/login");
      return;
    }
    fetchData(
      location.state.email,
      setUser,
      setStudy,
      setisLoading,
      history,
      location
    );
    updateAverageConcentrationFromLocalStorage(
      setAverageConcentration,
      LOCAL_STORAGE_KEY
    );
    checkAndSaveDataOnLoad();
  }, [graphActive]);

  const checkAndSaveDataOnLoad = () => {
    const lastSaveDate = loadFromLocalStorage(LAST_SAVE_DATE_KEY);
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD 형식으로 변환

    if (lastSaveDate !== today) {
      const data = loadFromLocalStorage(LOCAL_STORAGE_KEY);
      const timeInSeconds = parseInt(localStorage.getItem(TIMER_TIME)) || 0;
      const timeFormatted = new Date(timeInSeconds * 1000)
        .toISOString()
        .substr(11, 8); // seconds to HH:MM:SS 형식으로 변환
      if (data) {
        saveRecordConcentrate(user, lastSaveDate, {
          ...data,
          count: timeFormatted,
        }).then(() => {
          clearLocalStorage(LOCAL_STORAGE_KEY);
          clearLocalStorage(TIMER_TIME);
          saveToLocalStorage(LAST_SAVE_DATE_KEY, today);
        });
      } else {
        saveToLocalStorage(LAST_SAVE_DATE_KEY, today);
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
              <TodoForm
                user={user}
                setTodos={setStudy}
                fetchData={() =>
                  fetchData(
                    location.state.email,
                    setUser,
                    setStudy,
                    setisLoading,
                    history,
                    location
                  )
                }
              />
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
                    onPredict={(prediction) =>
                      handlePredict(
                        prediction,
                        graphActive,
                        setDataPoints,
                        setTotalConcentration,
                        setConcentrationCount,
                        setAverageConcentration,
                        LOCAL_STORAGE_KEY
                      )
                    }
                    model_url="https://teachablemachine.withgoogle.com/models/nFlJjJXF5/"
                    setGraphActive={setGraphActive}
                    setConcentrationLevel={setConcentrationLevel}
                  />
                )}
              </div>
              <div className="mt-10">
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
