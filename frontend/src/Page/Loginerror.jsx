import React, {useEffect, useState} from "react";
import axios from "axios";
import {useHistory} from 'react-router-dom';
import EmailorPwdError from "../components/EmailorPwdError.jsx";


function Loginerror() {

    const history = useHistory();

    //로그인 요소
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');

    //이메일 혹은 비밀번호 잘못 입력 시, 오류 모달창
    const [errormodal, setErrormodal] = useState(false);


    const onSubmit = async () => {
        console.log("로그인 성공");
        try {
            const formData = new FormData();
            formData.append('signin_email', email);
            formData.append('signin_pwd', pwd);

            const response = await axios.post('http://127.0.0.1:8000/api/login/', formData);
            console.log(response);

            if (response.status === 200) {
                console.log("로그인 성공");
                // 메인 페이지로 이동
                history.push({
                    pathname: '/',
                    state: {email: email}
                });
                // window.location.replace('/'); // 적절한 메인 페이지 경로로 수정
            }
            // else {
            //     console.log("로그인 실패");
            // }
        } catch (error) {
            console.log(error);

            if (error.response && error.response.status === 500) {
                setErrormodal(true);

            }
        }
    }


    return (

        <div>


            <form>
                <label htmlFor='signin_email'></label>
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
                <label htmlFor='signin_pwd'></label>
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
                        type="button"
                        onClick={onSubmit}
                        className="relative bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-transparent hover:text-purple-500 transition duration-300"
                    >

                        <span className="relative z-10">Sign in</span>
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