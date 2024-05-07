import React, {useState} from "react";
import axios from "axios";

import {useHistory} from "react-router-dom";
import Errormodal from "../components/Errormodal.jsx";
import EmailorPwdError from "../components/EmailorPwdError.jsx";


function Loginerror() {

    //홈페이지로 이동하기 위한 요소
    const history = useHistory();

    //오류 모달창
    const [modal, setModal] = useState(false);

    //로그인 요소
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');


    //이메일 혹은 비밀번호 잘못 입력 시, 오류 모달창
    const [errormodal, setErrormodal] = useState(false);



    //로그인 성공 시, 서버로 전송
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post('http://127.0.0.1:8000/api/login/', {
                user_login_id: email,
                user_password: pwd

            });

            console.log("response", result);
            if (result.status === 200) {
                history.push('/Page/Login');
            }
        } catch (error) {
            console.error(error);

            if (error.response && error.response.status === 500) {
                setErrormodal(true);

            }
        }

    }

    return (

        <div>
            <form action='http://localhost:8000' method='post' onSubmit={onSubmit}>
                <label htmlFor='signin_email'>Email:</label>
                <input
                    type='email'
                    id="signin_email"
                    className="bg-gray-200 border-none px-4 py-3 my-2 w-full"
                    name="signin_email"
                    value={email}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    required

                />
                <br/>
                <label htmlFor='signin_pwd'>Password:</label>
                <input
                    className="bg-gray-200 border-none px-4 py-3 my-2 w-full"
                    type='password'
                    id="signin_pwd"
                    name='signin_pwd'
                    value={pwd}
                    placeholder="Password"
                    onChange={(e) => setPwd(e.target.value)}
                    required
                />
                <br/>
                <div className="text-center">
                    <button
                        type="submit"
                        className="relative bg-white text-black text-xl font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-transparent hover:text-sky-400 transition duration-300"
                    >

                        <span className="relative z-10">sign in</span>
                        <span
                            className="absolute top-0 left-0 w-full h-full bg-purple-500 opacity-0 transition duration-300"></span>

                    </button>
                </div>
            </form>

            <div>
                <EmailorPwdError isOpen={errormodal} onClose={() => setErrormodal(false)}/>
            </div>




        </div>


    );

}

export default Loginerror;