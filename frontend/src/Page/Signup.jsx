import {useCallback, useState, useRouter} from "react";
import axios from "axios";

<link rel="stylesheet" href="https://rsms.me/inter/inter.css"/>

function Signup() {
    //회원가입 요소 입력
    const [id, setId] = useState('');
    const [signuppwd, setSignuppwd] = useState('');
    const [pwdconf, setPwdconf] = useState('');
    const [name, setName] = useState('');
    const [tel, setTel] = useState('');
    const [signupemail, setSignupemail] = useState('');

    //회원가입 요소 유효성 검사
    const [isid, setIsid] = useState(false);
    const [issignuppwd, setIssignuppwd] = useState(false);
    const [ispwdconf, setIspwdconf] = useState(false);
    const [isname, setIsname] = useState(false);
    const [istel, setIstel] = useState(false);
    const [issignupemail, setIssignupemail] = useState(false);

    //오류메세지

    const [idmsg, setIdmsg] = useState("");
    const [signuppwdmsg, setSignuppwdmsg] = useState("");
    const [pwdconfmsg, setPwdconfmsg] = useState("");
    const [namemsg, setNamemsg] = useState("");
    const [telmsg, setTelmsg] = useState("");
    const [signupemailmsg, setSignupemailmsg] = useState("");



    //회원가입 폼 제출 시, 실행 및 로그인 페이지로 연결
    //DB필드는 맞춰서 알아서 변경 필요
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post('http://127.0.0.1:8000/api/join/', {
                user_login_id: id,
                user_password: signuppwd,
                user_name: name,
                user_phone_number: tel,
                user_email: signupemail
            });

            console.log("response", result);
            if (result.status === 200) {
                router.push('/Page/Login');
            }
        } catch (error) {
            console.error(error);
        }

    }

//아이디
    const handleId = () => {
        if (!id) {
            setIdmsg("아이디 입력해주세요.");
            setIsid(true);

        } else {
            setIdmsg("");
            setIsid(false);
            console.log("아이디 입력 성공");

        }
    }


//비밀번호
    const handleSignuppwd = () => {


        if (!signuppwd) {
            setSignuppwdmsg("비밀번호를 입력해주세요.");
            setIssignuppwd(true);
        } else {
            setSignuppwdmsg("");
            setIssignuppwd(false);
            console.log("비밀번호 입력 성공");
        }
    }

//비밀번호 재입력
    const handleSignuppwdconf = (e) => {
        setPwdconf(e.target.value);

        //비밀번호 재입력 필드가 공백일 때, 오류메세지 실행 하지 않음.
        if(!e.target.value){
            setPwdconfmsg("");
            setIspwdconf(false);
            return;
        }

        if(signuppwd !== pwdconf){
            setPwdconfmsg("비밀번호가 일치하지 않습니다.");
            setIspwdconf(true);
        }else {
            setPwdconfmsg("비밀번호가 일치합니다.");
            setIspwdconf(false);
        }
    }

//이름
    const handleName = (e) => {

        if (!name) {
            setNamemsg("이름을 입력해주세요.");
            setIsname(true);
        } else {
            setNamemsg("");
            setIsname(false);
            console.log("이름 입력 성공");
        }
    }

//전화번호:000-0000-0000 형식으로 유효성 검사
    const handleTel =(e) => {
        const telsize = e.target.value;
        const telvaild = /^\d{3}-\d{4}-\d{4}$/.test(e.target.value);
        if (!telvaild || telsize.length !== 13) {
            setTelmsg("000-0000-0000으로 입력해주세요.");
            setIstel(true);
        } else {
            setTelmsg("");
            setIstel(false);
            console.log("전화번호 입력 성공");
        }

    }
//이메일
    const handleSignupemail = (e) => {
        if (!e.target.value){
            setSignupemailmsg("이메일을 입력해주세요.");
            setIssignupemail(true);
        }else {
            const emailvaild = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e.target.value);
            if (!emailvaild) {
                setSignupemailmsg("이메일 형식으로 입력해주세요.");
                setIssignupemail(true);
            } else {
                setSignupemailmsg("");
                setIssignupemail(false);
                console.log("이메일 입력 성공");
            }
        }
    }


    return (
        <div className="bg-gray-200">


            <header className="text-center text-5xl signup-title py-6 font-bold font-inter sans-serif">
                <h1>Let's be friends!</h1>
            </header>
            <div className="text-center">
                <div className="mx-auto border-black border-2 w-80 p-16 mb-8 bg-white">
                    <form action='http://localhost:8000/api/join/' method='post' onSubmit={onSubmit}>
                        <label htmlFor="signup_foam"></label>
                        <div className="text-left">
                            ID
                            <input
                                type="id"
                                placeholder="아이디 입력"
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                                onBlur={handleId}
                                required

                            />
                        </div>
                        {idmsg && <p className="text-red-500 text-xs text-left">{idmsg}</p>}


                        <div class="text-left ">
                            PASSWORD
                            <input
                                type="password"
                                placeholder="비밀번호 입력"
                                value={signuppwd}
                                onBlur={handleSignuppwd}
                                onChange={(e) => setSignuppwd(e.target.value)}
                                required
                            />
                        </div>

                        {signuppwdmsg && <p className="text-red-500 text-xs text-left">{signuppwdmsg}</p>}

                        <div class="text-left">
                            PASSWORD CONFRIM
                            <input
                                text="password"
                                placeholder="비밀번호 재입력"
                                value={pwdconf}
                                onBlur={handleSignuppwdconf}
                                onChange={(e) => setPwdconf(e.target.value)}
                                required
                            />
                        </div>
                        {pwdconfmsg && <p className="text-red-500 text-xs text-left">{pwdconfmsg}</p>}

                        <div class="text-left">
                            NAME
                            <input
                                text="name"
                                placeholder="이름"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                onBlur={handleName}
                            />
                        </div>

                        {namemsg && <p className="text-red-500 text-xs text-left">{namemsg}</p>}
                        <div class="text-left">
                            TEL
                            <input
                                type="tel"
                                placeholder="전화번호 입력"
                                value={tel}
                                onBlur={handleTel}
                                onChange={(e) => setTel(e.target.value)}
                                required
                            />
                        </div>

                        {telmsg && <p className="text-red-500 text-xs text-left">{telmsg}</p>}
                        <div class="text-left">
                            EMAIL
                            <input
                                type="email"
                                placeholder="이메일 입력"
                                value={signupemail}
                                onBlur={handleSignupemail}
                                onChange={(e) => {
                                    setSignupemail(e.target.value)
                                }}
                                required
                            />
                        </div>

                        {signupemailmsg && <p className="text-red-500 text-xs text-left">{signupemailmsg}</p>}


                        <button className="p-4" type="submit">가입하기</button>

                    </form>

                </div>


        </div>
    </div>
    );
}

export default Signup;