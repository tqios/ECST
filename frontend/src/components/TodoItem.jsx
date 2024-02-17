import React from "react";
import {
  MdOutlineDeleteOutline,
  MdEditNote,
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";
import { FaRegCheckCircle, FaCheck } from "react-icons/fa";
import { RiCalendarTodoFill } from "react-icons/ri";
import { RxLapTimer } from "react-icons/rx";

const TodoItem = ({ todoItem, handleCheckbox, handleDelete, setEditText }) => {
  return (
    <tr key={todoItem.id} className="border-b border-black">
      {/*투두 완료 유무 + 완료 체크 기능*/}
      <td className="p-3 text-sm text-center">
        <span
          onClick={() => handleCheckbox(todoItem.id, todoItem.study_completed)}
          className={`p-1.5 text-xs font-medium tracking-wider rounded-md ${
            todoItem.study_completed ? "bg-green-300" : "bg-red-300"
          }`}
        >
          {todoItem.study_completed ? "Done" : "Incomplete"}
        </span>
      </td>
      {/*투두 내용*/}
      <td className="p-3 text-sm" title={todoItem.id}>
        {todoItem.study_todo}
      </td>
      {/*공부한 시간*/}
      <td className="p-3 text-sm font-medium">{todoItem.study_time}</td>
      {/*수정 및 삭제*/}
      <td className="p-3 text-sm font-medium grid grid-flow-col items-center mt-5">
        <span>
          <label htmlFor="my-modal">
            <MdEditNote
              onClick={() => setEditText(todoItem)}
              className="text-xl cursor-pointer"
            />
          </label>
        </span>
        <span className="text-xl cursor-pointer">
          <MdOutlineDeleteOutline onClick={() => handleDelete(todoItem.id)} />
        </span>
      </td>
      <td className="p-3 text-sm" title={todoItem.id}>
        <FaRegCheckCircle />
      </td>
    </tr>
  );
};

export default TodoItem;
