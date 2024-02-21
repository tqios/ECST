import React, { useRef, useState } from "react";

import { MdOutlineDeleteOutline, MdEditNote } from "react-icons/md";

import { VscDebugStart } from "react-icons/vsc";
import { TiMediaStopOutline } from "react-icons/ti";
import PracticeCam from "./PracticeCam.jsx";
import Camerabtn from "./Camerabtn.jsx";

const TodoItem = ({
  todoItem,
  handleCheckbox,
  handleDelete,
  setEditText,
  setStream,
  stream,
}) => {
  //비디오 캠
  // const [stream, setStream] = useState(false);

  const videoRef = useRef(null);

  const [startActive, setStartActive] = useState(false);
  const [stopActive, setStopActive] = useState(false);

  //캠 시작 버튼
  const start = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setStartActive(false); // 시작 버튼 비활성화
      setStopActive(true); // 중지 버튼 활성화
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };
  //캠 중지 버튼
  const stop = () => {
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      setStream(null);
      setStartActive(true); // 시작 버튼 활성화
      setStopActive(false); // 중지 버튼 비활성화
    }
  };

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
      {/*/!*공부 시작 버튼*!/*/}
      {/*<td className="p-3 text-sm" title={todoItem.id}>*/}
      {/*  {stream ? (*/}
      {/*    <button*/}
      {/*      className="btn btn-outline font-sm text-red-800"*/}
      {/*      onClick={handlestop}*/}
      {/*    >*/}
      {/*      <div className="flex items-center">*/}
      {/*        Stop*/}
      {/*        <TiMediaStopOutline />*/}
      {/*      </div>*/}
      {/*    </button>*/}
      {/*  ) : (*/}
      {/*    <button*/}
      {/*      className="btn btn-outline font-sm text-blue-900"*/}
      {/*      onClick={handlestart}*/}
      {/*    >*/}
      {/*      <div className="flex items-center">*/}
      {/*        Start*/}
      {/*        <VscDebugStart />*/}
      {/*      </div>*/}
      {/*    </button>*/}
      {/*  )}*/}
      {/*</td>*/}
      <td className="p-3 text-sm" title={todoItem.id}>
        {/*<Camerabtn*/}
        {/*  onClick={stream ? stop : start}*/}
        {/*  label={stream ? "Stop" : "Start"}*/}
        {/*/>*/}
        <div className="flex">
          {/* 시작 버튼 */}
          {/*<Camerabtn*/}
          {/*  onClick={() => {*/}
          {/*    start();*/}
          {/*    setStartActive(false); // 시작 버튼 비활성화*/}
          {/*    setStopActive(true); // 중지 버튼 활성화*/}
          {/*  }}*/}
          {/*  label="Start"*/}
          {/*  isActive={startActive} // 시작 버튼의 활성화 상태를 전달*/}
          {/*/>*/}
          {/*/!* 중지 버튼 *!/*/}
          {/*<Camerabtn*/}
          {/*  onClick={() => {*/}
          {/*    stop();*/}
          {/*    setStartActive(true); // 시작 버튼 활성화*/}
          {/*    setStopActive(false); // 중지 버튼 비활성화*/}
          {/*  }}*/}
          {/*  label="Stop"*/}
          {/*  isActive={stopActive} // 중지 버튼의 활성화 상태를 전달*/}
          {/*/>*/}

          {/* 시작 버튼 */}
          <Camerabtn
            onClick={start}
            label="Start"
            isActive={!!stream} // stream 상태에 따라 버튼 활성화 여부 결정
          />
          {/* 중지 버튼 */}
          <Camerabtn
            onClick={stop}
            label="Stop"
            isActive={!stream} // stream 상태에 따라 버튼 활성화 여부 결정
          />
        </div>
      </td>
    </tr>
  );
};

export default TodoItem;
