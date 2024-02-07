import React, { useState, useEffect } from 'react';
import { CgProfile } from 'react-icons/cg';
import axios from 'axios';

import Table from '../components/Table.jsx';
import TodoForm from '../components/TodoForm.jsx';


function Home() {

    const [todos, setTodos] = useState('');
    const [isLoading, setisLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/api/study',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                console.log(`응답: `, response);
                let data = response.data;
                if (response.data) {
                    console.log('data', data);
                }
            })
            .catch((error) => {
                console.error('Error during POST request:', error);
            });
        try {
            const response = await axios.get(
                'http://127.0.0.1:8000/api/study' // 수정된 요청 경로
            );
            console.log(response);
            setTodos(response.data);
            setisLoading(false);
        } catch (error) {
            console.log(error);
        }
    };
    const MenuBtn = () => {

        return (
            <nav className="menu" style={{textAlign: 'center'}}>
                <div>
                    <button className="m-5 outline-none custom-btn btn-1 text-base">내 수업</button>
                    <button className="m-5 outline-none custom-btn btn-1 text-base">집중도 분석</button>
                    <button className="m-5 outline-none custom-btn btn-1 text-base">마이페이지</button>
                </div>

            </nav>
        );
    }


    return (
        <div>
            {/*머리*/}
            <div className="flex justify-between items-center">

                <div className="text-6xl font-bold">
                    <h1>Learning Mate</h1>
                </div>
                <div className="ml-auto">
                    <CgProfile className="text-3xl"/>
                </div>
            </div>
            <hr/>
            {/*메뉴바*/}
            <div className="p-2 bg-blue-950 text-white font-bold">
                <MenuBtn/>
            </div>
            <hr/>

            {/*박스들*/}
            <div className="bg-indigo-100 min-h-screen p-2 rounded-lg mt-4">
                <nav className="pt-8"><h1 className=" text-5xl text-center pb-8">To Do List </h1>
                </nav>
                 {/* Body */}
                <TodoForm
                setTodos={setTodos}
                fetchData={fetchData}
                />
                <Table
                    todos={todos}
                    isLoading={isLoading}
                    setTodos={setTodos}
                />
            </div>
        </div>
    );

}

export default Home;