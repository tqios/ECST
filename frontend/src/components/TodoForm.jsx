import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TodoForm = ({ setTodos, fetchData }) => {
  const [newTodo, setNewTodo] = useState({
    body: '',
  });

  const handleChange = (e) => {
    setNewTodo((prev) => ({
      ...prev,  //  ...prev는 이전 상태를 복사
      body: e.target.value,  //  body 속성을 e.target.value로 설정하여 새로운 할 일의 내용을 업데이트
    }));
  };

  const postTodo = async () => {
    try {
      await axios.post(`http://127.0.0.1:8000/api/todo/`, newTodo);
      setNewTodo({ body: '' });  // 폼 비우기
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
          postTodo();
      }
  }

  return (
    <>
      <input
        type="text"
        placeholder="Add Todo"
        value={newTodo.body}
        className="input input-bordered input-info w-full max-w-xs"
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            postTodo();
          }
        }}
      />
      <button
        onClick={postTodo}
        className="btn btn-primary ml-2"
      >
        Add todo
      </button>
    </>
  );
};

export default TodoForm;
