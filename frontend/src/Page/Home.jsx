import React, {useState, useEffect} from 'react';
import {CgProfile} from 'react-icons/cg';
import axios from 'axios';
import {useHistory} from "react-router-dom";

import Table from '../components/Table.jsx';
import TodoForm from '../components/TodoForm.jsx';
import Cam from "../components/Cam.jsx";
import Profile from "../components/Profile.jsx";
import {FaHeartCirclePlus} from "react-icons/fa6";


function Home() {

    const [todos, setTodos] = useState('');
    const [isLoading, setisLoading] = useState(true);

    //로그인 버튼 시, 로그인 페이지로 전환
    const history = useHistory();


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {

        try {
            const response = await axios.get(
                'http://127.0.0.1:8000/api/todo/' // 수정된 요청 경로
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

    //로그인 하면 사용자의 이름과 이메일 업데이트

    const handleprofile = (data) => {
        history.push('/Login');
    }


    return (
        <div>
            {/*머리*/}
            <div className="flex justify-between items-center">

                <div className="text-6xl font-bold">
                    <h1>Learning Mate</h1>
                </div>
                {/*<div className="ml-auto">*/}
                {/*    <CgProfile className="text-3xl"/>*/}
                {/*    <div>*/}
                {/*        000님*/}
                {/*    </div>*/}
                {/*    <div>*/}
                {/*        이메일*/}
                {/*    </div>*/}
                {/*</div>*/}


                <div>
                    <div className="text-right">
                        <CgProfile className="text-3xl text-right"/>
                    </div>
                    <div className="text-center mt-2 mr-2">
                        {name ? (
                            <Profile name={name} email={email}/>
                        ) : (

                            <button onClick={handleprofile}>로그인</button>

                        )}
                    </div>
                </div>
            </div>
            <hr/>
            {/*메뉴바*/}
            <div className="p-2 bg-blue-950 text-white font-bold">
                <MenuBtn/>
            </div>
            <hr/>

            {/*박스들*/}
            <div className="flex">
                <div className="bg-indigo-100 min-h-screen p-2 rounded-lg mt-4 w-1/2">
                    <nav className="pt-8"><h1 className="font-bold text-5xl text-center pb-8">To Do
                        List </h1>
                    </nav>
                    {/* Body */}
                    <TodoForm
                        setTodos={setTodos}
                        fetchData={fetchData}
                    />
                    <div className="flex items-center text-2xl">
                        <FaHeartCirclePlus className="text-rose-400"/>
                        <div className="ml-2 mt-5 mb-5 font-bold text-2xl">
                            Total Study Time :
                        </div>

                    </div>
                    <Table
                        todos={todos}
                        isLoading={isLoading}
                        setTodos={setTodos}
                    />

                </div>
                <div>
                    <div>
                        <Cam/>
                    </div>
                    <div className="rounded-lg box-border text-center border-black border-1 w-full p-60 mb-10">
                        Graph
                    </div>
                </div>
            </div>

        </div>
    );

}

export default Home;