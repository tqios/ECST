import { MdOutlineDeleteOutline, MdEditNote } from "react-icons/md";
import { useState } from "react";

const TodoItem = ({
  todoItem,
  handleCheckbox,
  handleDelete,
  setEditText,
  selectedItemId,
  onRadioChange,
}) => {
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
      <td className="p-3 text-sm font-medium">{todoItem.study_duration}</td>
      {/*수정 및 삭제*/}
      <td className="p-3 font-medium grid grid-flow-col items-center mt-3">
        <span className="text-3xl cursor-pointer">
          <label htmlFor="my-modal">
            <MdEditNote
              onClick={() => setEditText(todoItem)}
              className="text-3xl cursor-pointer mt-2"
            />
          </label>
        </span>
        <span className="text-2xl  cursor-pointer mt-2">
          <MdOutlineDeleteOutline onClick={() => handleDelete(todoItem.id)} />
        </span>
      </td>

      <td className="p-3 text-sm" title={todoItem.id}>
        <input
          type="radio"
          id={todoItem.id}
          value={todoItem.id}
          checked={selectedItemId === todoItem.id}
          onChange={() => onRadioChange(todoItem.id)}
        />
      </td>
    </tr>
  );
};

export default TodoItem;
