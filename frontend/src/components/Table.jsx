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

const Table = ({ todos, isLoading, setStudy }) => {
  const [editText, setEditText] = useState({
    body: "",
  });

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/todo/${id}/`);
      const newList = study.filter((todo) => todo.id !== id);
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
      const newStudy = study.map((todo) =>
        todo.id === id ? response.data : todo,
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
      body: e.target.value,
    }));
    console.log(editText);
  };

  const handleClick = () => {
    handleEdit(editText.id, editText);
    setEditText({
      body: "",
    });
  };

  const handleCheckbox = (id, value) => {
    console.log(value.completed);
    handleEdit(id, {
      completed: !value,
    });
  };

  return (
    <div>
      <table className="w-11/12 max-w-4xl">
        {/*    <table className="w-400 h-500">*/}
        <thead className="border-b-2 border-black">
          <tr className="flex justify-between">
            <th className="flex-grow p-3 text-sm font-semibold tracking-wide">
              <div className="flex items-center">
                <FaCheck />
                <span className="ml-2">Number</span>
              </div>
            </th>
            <th className="flex-grow p-3 text-sm font-semibold tracking-wide">
              <div className="flex items-center">
                <RiCalendarTodoFill />
                <span className="ml-2">ToDo</span>
              </div>
            </th>
            <th className="flex-grow p-3 text-sm font-semibold tracking-wide">
              <div className="flex items-center">
                <RxLapTimer />
                <span className="ml-2">TimeAttack</span>
              </div>
            </th>
            <th className="flex-grow p-3 text-sm font-semibold tracking-wide">
              <div className="flex items-center">
                <TbProgressCheck />
                <span className="ml-2">Progress</span>
              </div>
            </th>
            <th className="flex-grow p-3 text-sm font-semibold tracking-wide">
              <div className="flex items-center">
                <MdDelete />
                <span className="ml-2">Delete</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <div>Is Loading </div>
          ) : !todos || todos.length === 0 ? null : (
            <>
              {" "}
              {todos.map((todoItem, index) => (
                <tr key={todoItem.id} className="border-b border-black">
                  <td className="p-3 text-left">
                    <span
                      onClick={() =>
                        handleCheckbox(todoItem.id, todoItem.study_completed)
                      }
                      className="inline-block cursor-pointer"
                    >
                      {todoItem.study_completed === true ? (
                        <MdOutlineCheckBox />
                      ) : (
                        <MdOutlineCheckBoxOutlineBlank />
                      )}
                    </span>
                  </td>
                  <td className="p-3 text-sm " title={todoItem.id}>
                    {todoItem.study_todo}
                  </td>
                  <td className="p-3 text-sm text-left">
                    <span
                      className={`p-1.5 text-xs font-medium tracking-wider rounded-md ${
                        todoItem.study_completed ? "bg-green-300" : "bg-red-300"
                      }`}
                    >
                      {todoItem.study_completed ? "Done" : "Incomplete"}
                    </span>
                  </td>
                  <td className="p-3 text-sm font-medium">
                    {new Date(todoItem.created).toLocaleString()}
                  </td>
                  <td className="p-3 text-sm font-medium grid grid-flow-col items-center mt-5 ">
                    <span>
                      <label htmlFor="my-modal">
                        <MdEditNote
                          onClick={() => setEditText(todoItem)}
                          className=" text-xl cursor-pointer"
                        />
                      </label>
                    </span>
                    <span className=" text-xl cursor-pointer">
                      <MdOutlineDeleteOutline
                        onClick={() => handleDelete(todoItem.id)}
                      />
                    </span>
                  </td>
                </tr>
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
            value={editText.body}
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
