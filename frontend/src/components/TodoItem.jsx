import React, { useRef, useState } from "react";
import { MdOutlineDeleteOutline, MdEditNote } from "react-icons/md";
import { VscDebugStart } from "react-icons/vsc";
import { TiMediaStopOutline } from "react-icons/ti";
import Camerabtn from "./Camerabtn.jsx";
import { ImCheckboxUnchecked } from "react-icons/im";import { IoCheckbox } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { FaStop } from "react-icons/fa";
const TodoItem = ({
  todoItem,
  handleCheckbox,
  handleDelete,
  setEditText,
  setStream,
  stream,
    selectedItemId,
    onRadioChange,
    handleReset,
}) => {
  const videoRef = useRef(null);
  const [startActive, setStartActive] = useState(false);
  const [stopActive, setStopActive] = useState(false);

  const start = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setStartActive(false);
      setStopActive(true);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const stop = () => {
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      setStream(null);
      setStartActive(true);
      setStopActive(false);
    }
  };

  return (
    <tr key={todoItem.id} className="border-b border-black">
      <td className="p-3 text-sm text-center">
        <div
          onClick={() => handleCheckbox(todoItem.id, todoItem.study_completed)}
          style={{width:"fit-content", margin:"0 auto"}}
          className={`p-1.5 text-xs font-medium tracking-wider rounded-md ${
            todoItem.study_completed ? "bg-green-300" : "bg-red-300"
          }`}
        >
          {todoItem.study_completed ? <FaCheck /> : <ImCheckboxUnchecked />}
        </div>
      </td>
      <td className="p-3 text-sm" title={todoItem.id}>
        {todoItem.study_todo}
      </td>
      <td className="p-3 font-medium grid grid-flow-col items-center mt-3">
        <span className="text-3xl cursor-pointer">
          <label htmlFor="my-modal">
            <MdEditNote
              onClick={() => setEditText(todoItem)}
              className="text-xl cursor-pointer"
            />
          </label>
        </span>
        <span className="text-2xl  cursor-pointer">
          <MdOutlineDeleteOutline onClick={() => handleDelete(todoItem.id)} />
        </span>
      </td>
      <td className="p-3 text-sm" title={todoItem.id}>
        {/*<input*/}
        {/*  type="radio"*/}
        {/*  id={todoItem.id}*/}
        {/*  value={todoItem.id}*/}
        {/*  checked={selectedItemId === todoItem.id}*/}
        {/*  onChange={() => onRadioChange(todoItem.id, todoItem.study_todo)}*/}
        {/*/>*/}
        {selectedItemId === todoItem.id ?
            <button onClick={() => handleReset()}><FaStop/></button>
            : <button onClick={() => onRadioChange(todoItem.id, todoItem.study_todo)}><FaPlay/></button>

        }


      </td>
    </tr>
  );
};

export default TodoItem;
