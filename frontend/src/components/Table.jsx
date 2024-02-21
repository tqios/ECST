import axios from "axios";
import React, { useState } from "react";
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
import { TbProgressCheck } from "react-icons/tb";
import TodoItem from "./TodoItem.jsx";

const Table = ({ study, isLoading, setStudy }) => {
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

  // 공부 시작을 위한 라디오버튼 활성화 함수
  const handleRadioChange = (itemId) => {
    setSelectedItemId(itemId);
  };

  // 선택된 항목 초기화
  const handleReset = () => {
    setSelectedItemId(null);
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
      <table className="w-11/12 max-w-4xl">
        <thead className="border-b-2 border-black">
          <tr>
            <th className="p-3 text-sm font-semibold tracking-wide text-left items-center">
              <FaCheck />
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-center items-center">
              To Do <RiCalendarTodoFill />
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-right items-center">
              누적시간 <RxLapTimer />
            </th>

            <th className="p-3 text-sm font-semibold tracking-wide text-right items-center">
              수정/삭제
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-right items-center">
              <RxLapTimer />
              <button onClick={handleReset}>리셋</button>
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
