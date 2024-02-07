import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";


function Homepractice() {
    // const [showing, setShowing] = useState(false);
    // const onClick = () => setShowing((prev) => !prev);
    // const [toDo, setToDo] = useState("");
    // const [toDos, setToDos] = useState([]);
    // const onChange = (event) => setToDo(event.target.value);
    // const onSubmit = (event) => {
    //     event.preventDefault();
    //     if (toDo === "") {
    //         return;
    //     }
    //     setToDos((currentArray) => [toDo, ...currentArray]);
    //     setToDo("");
    // };

    const MenuBtn = () => {

        return (
            <nav className="menu" style={{ textAlign: 'center' }}>
                <div>
                    <button style={{fontSize:'12px'}}>내 수업</button>
                    <button style={{fontSize:'12px'}}>집중도 분석</button>
                    <button style={{fontSize:'12px'}}>마이페이지</button>
                </div>

            </nav>
        );
    }


    return (
        <div>
            <div className="flex justify-between items-center">
                <div>
                <h1>LEARNING MATE</h1>
                </div>
                <div style={{ marginLeft: 'auto' }}>
                <CgProfile style={{ fontSize: '30px' }}/>
                </div>
                <div className="btn-group">
                    <button type="button" className="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    Action
                     </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">Action</a></li>
                        <li><a className="dropdown-item" href="#">Another action</a></li>
                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><a className="dropdown-item" href="#">Separated link</a></li>
                    </ul>
                </div>

            </div>
            <hr />

            <div style={{padding:'10px 5px'}}>
                <MenuBtn />
            </div>
            <hr />




            <div>
                <div>
                    <div style={{boxSizing: 'border-box', textAlign: 'center', borderColor: 'black', borderWidth: '1px', borderStyle: 'solid', width: '60%', padding: '100px 40px', marginBottom: '20px' }}>
                        여기 동영상 자리
                    </div>

                </div>
                <div style={{ display: 'flex'}}>
                    <div style={{ flex: '1', textAlign: 'center', borderColor: 'black', borderWidth: '1px', borderStyle: 'solid', width: '30%', padding: '20px', marginBottom: '20px' }}>

                        <h2>그래프</h2>
                    </div>
                    <div>
                        {/*<div style={{ flex: '1', textAlign: 'center', borderColor: 'black', borderWidth: '1px', borderStyle: 'solid', width: '60%', padding: '10px 5px', marginBottom: '20px' }}>*/}

                        {/*    <h1>My To Do List ({toDos.length})</h1>*/}
                        {/*    <form onSubmit={onSubmit}>*/}
                        {/*        <input*/}
                        {/*            onChange={onChange}*/}
                        {/*            value={toDo}*/}
                        {/*            type="text"*/}
                        {/*            placeholder="Write your to do..."*/}
                        {/*        />*/}
                        {/*        <button>click</button>*/}
                        {/*    </form>*/}
                        {/*    <hr />*/}
                        {/*    <ul style={{ textAlign: "left" }}>*/}
                        {/*        {toDos.map((item, index) => (*/}
                        {/*            <li key={index}>{item}</li>*/}
                        {/*        ))}*/}
                        {/*    </ul>*/}
                        {/*</div>*/}
                        <div style={{ boxSizing: 'border-box', textAlign: 'center', borderColor: 'black', borderWidth: '1px', borderStyle: 'solid', width: '70%', padding: '100px 40px', marginBottom: '20px' }}>
                            여기 공부시간집계
                        </div>
                    </div>

                </div>
            </div>


        </div>




    );





}

export default Homepractice;