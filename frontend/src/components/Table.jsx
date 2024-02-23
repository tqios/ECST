import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  MdOutlineDeleteOutline,
  MdEditNote,
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { RiCalendarTodoFill } from "react-icons/ri";
import { RxLapTimer } from "react-icons/rx";
import { MdDelete } from "react-icons/md";
import { FaCamera } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { TbProgressCheck } from "react-icons/tb";
import TodoItem from "./TodoItem.jsx";

import TodoItem from "./TodoItem.jsx";

const Table = ({ study, isLoading, setStudy, setStream, stream }) => {
  const [editText, setEditText] = useState({
    study_todo: "",
  });

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/study/${id}/`);
      const newList = study.filter((ele) => ele.id !== id);
      setStudy(newList);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (id, value) => {
    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/study/${id}/`,
        value,
      );
      console.log(response.data);
      const newStudy = study.map((ele) =>
        ele.id === id ? response.data : ele,
      );
      setStudy(newStudy);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setEditText((prev) => ({
      ...prev,
      study_todo: e.target.value,
    }));
    console.log(editText);
  };

  const handleClick = () => {
    handleEdit(editText.id, editText);
    setEditText({
      study_todo: "",
    });
  };

  // 투루 완료시 완료상태로 변경하는 함수
  const handleCheckbox = (id, value) => {
    handleEdit(id, {
      study_completed: !value,
    });
  };

  const [selectedItemId, setSelectedItemId] = useState(null);

  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [radioChecked, setRadioChecked] = useState(false);
  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isRunning]);

  // 공부 시작을 위한 라디오버튼 활성화 함수
  const handleRadioChange = (itemId) => {
    setSelectedItemId(itemId);
    setIsRunning((prevIsRunning) => !prevIsRunning);
    setRadioChecked(true);
  };

  // 선택된 항목 초기화
  const handleReset = async (id) => {
    setSelectedItemId(null);
    console.log("time : ", time);
    // 서버로 데이터 전송
    await axios
      .post(`http://localhost:8000/api/study/${id}/`, {
        time: time,
      })
      .then((response) => {
        console.log("누적된 시간 서버로 전송됨:", response.data);
        // console.log("total time : ", response.addedData);
        const newStudy = study.map((ele) =>
          ele.id === id ? response.data : ele,
        );
        setStudy(newStudy);
      })
      .catch((error) => {
        console.error("데이터 전송 중 에러:", error);
      });

    // 스톱워치 초기화
    setTime(0);
    setIsRunning(false);
    setRadioChecked(false);
  };

  // 선택된 항목의 데이터를 가져오는 함수
  const getSelectedItemData = () => {
    if (!selectedItemId) return null;

    return study.find((item) => item.id === selectedItemId);
  };

  const selectedItemData = getSelectedItemData(); // 선택된 항목의 데이터

  return (
    <div>
      {selectedItemData && (
        <div>
          <h2>선택된 항목 데이터:</h2>
          <p>ID: {selectedItemData.id}</p>
          <p>Name: {selectedItemData.study_todo}</p>
          {/* 다른 데이터 필드들을 여기에 추가 */}
        </div>
      )}
      <div> {time}만큼 공부중!</div>
      <table className="w-11/12 max-w-4xl">
        <thead className="border-b-2 border-black">
          <tr>
            <th className="p-3 text-sm font-semibold tracking-wide text-left items-center">
              <div className="flex items-center font-sm">
                <FaCheck />
                Progress
              </div>
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-center items-center">
              <div className="flex items-center">
                <RiCalendarTodoFill />
                ToDo
              </div>
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-right items-center">
              <div className="flex items-center">
                <RxLapTimer />
                Cumulative Study Time
              </div>
            </th>

            <th className="p-3 text-sm font-semibold tracking-wide text-right items-center">
              <span className="flex items-center">
                <FaRegEdit />
                Edit
                <MdDelete className="ml-2" />
                Delete
              </span>
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-right items-center">
              <RxLapTimer />
              <button onClick={() => handleReset(getSelectedItemData().id)}>
                리셋
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="3">Is Loading</td>
            </tr>
          ) : !study || study.length === 0 ? (
            <tr>
              <td colSpan="5"></td>
            </tr>
          ) : (
            <>
              {/*Table 컴포넌트 내부에서 TodoItem 컴포넌트 사용*/}
              {study.map((todoItem, index) => (
                <TodoItem
                  key={index}
                  todoItem={todoItem}
                  handleCheckbox={handleCheckbox}
                  handleDelete={handleDelete}
                  setEditText={setEditText}
                  setStream={setStream}
                  stream={stream}
                  selectedItemId={selectedItemId}
                  onRadioChange={handleRadioChange}
                />
              ))}
            </>
          )}
        </tbody>
      </table>

      {/* Modal */}
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Todo</h3>
          <input
            type="text"
            value={editText.study_todo}
            onChange={handleChange}
            placeholder="Type here"
            className="input input-bordered w-full mt-8"
          />
          <div className="modal-action">
            <label
              htmlFor="my-modal"
              onClick={handleClick}
              className="btn btn-primary"
            >
              Edit
            </label>
            <label htmlFor="my-modal" className="btn">
              Close
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
