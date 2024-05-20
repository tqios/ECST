import React, { useState, useEffect } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { actionCreators } from "../TodoRedux/Actions.jsx";
import axios from "axios";
import TodoItem from "./TodoItem.jsx";
import { todoElementMutator, studyStop, studyStart} from "../TodoRedux/currTodo.jsx";

//아이콘
import { FaCheck,FaRegEdit, FaPause } from "react-icons/fa";
import { RiCalendarTodoFill } from "react-icons/ri";
import { RxLapTimer } from "react-icons/rx";
import { MdDelete } from "react-icons/md";
import { GrPowerReset } from "react-icons/gr";

const Todo = ({ study, isLoading, setStudy, setStream, stream }) => {
  const [editText, setEditText] = useState({
    study_todo: "",
  });
  //dispatch:action으로 reducer가 새로운 상태(modify)로 된 걸 렌더링하게 도와주는 역할
  const dispatch = useDispatch();
  const [selectedItemId, setSelectedItemId] = useState(null);
  //리덕스 상태 가져오기
  const curr = useSelector((state) => state.todoModifier.value);
  const isStudy = useSelector((state) => state.todoModifier.isStudy);
  //삭제
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/study/${id}/`);
      const newList = study.filter(todo => todo.id !== id)
      setStudy(newList)
      // dispatch(deleteTodo(id));
    } catch (error) {
      console.log(error);
    }
  };
  //편집
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

  //todo편집 함수
  const handleChange = (e) => {
    const updatedValue = e.target.value;
    console.log(updatedValue);
    // dispatch(todoElementMutator(updatedValue))
    setEditText({ ...editText, study_todo: updatedValue });
  };

  //edit버튼 클릭 버튼
  const handleClick = () => {
    // handleEdit(editText.id);
    // console.log(editText.study_todo)
    setEditText(editText.id, editText.study_todo);
    handleEdit(editText.id, editText);
    setEditText({
      study_todo: "",
    });
        // dispatch(todoElementMutator(updatedValue))

    setEditText({ study_todo: "" });
  };


  //공부 진도 상태
  const handleCheckbox = (id, study_completed) => {
    // dispatch(studyCompleted(todoItem.id, todoItem.study_completed));
    handleEdit(id, {
      'study_completed': !study_completed
    })
    console.log(study_completed);
    console.log(id);
  };

  // 공부 시작을 위한 라디오버튼 활성화 함수
  const handleRadioChange = (id, item) => {
    setSelectedItemId(id)
    console.log("change Todo element");

    dispatch(studyStart())
    dispatch(todoElementMutator(item))

    console.log(isStudy)
  };

  // 선택된 항목 초기화
  const handleReset = () => {
    setSelectedItemId("")
    dispatch(studyStop())
    dispatch(todoElementMutator("공부항목을 선택해주세요"))
  };

  // 선택된 항목의 데이터를 가져오는 함수
  const getSelectedItemData = () => {
    if (!selectedItemId) return null;

    return study.find((item) => item.id === selectedItemId);
  };

  const selectedItemData = getSelectedItemData(); // 선택된 항목의 데이터

  return (
    <div>


      <table className="w-11/12 max-w-4xl">
        <thead className="border-b-2 border-black">
          <tr>
            <th className="p-3 text-sm font-semibold tracking-wide text-left items-center">
              <div className="flex items-center font-sm">
                <FaCheck />
                Progress
              </div>
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide items-center">
              <div className="flex items-center">
                <RiCalendarTodoFill />
                ToDo
              </div>
            </th>

            <th className="p-3 text-sm font-semibold tracking-wide  items-center">
              <span className="flex items-center">
                <FaRegEdit className="text-sm" />
                Edit
                <MdDelete className="ml-2" />
                Delete
              </span>
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-right items-center">
              <div className="flex items-center">
                <FaPause />
                <button onClick={handleReset}>Pause</button>
              </div>
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
                  handleReset = {handleReset}
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

// mapStateToProps 함수 정의
const mapStateToProps = (state) => ({
  todoItems: state.todoItem,
});

function mapDispatchToProps(dispatch) {
  return {
    studyCompleted: (id, study_completed) =>
      dispatch(actionCreators.studyCompleted(id, study_completed)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
