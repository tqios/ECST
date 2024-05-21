import React from "react";
import {Link} from "react-router-dom";

export default function MenuNav() {
    return (
        <nav className="menu" style={{textAlign: "center"}}>
            <div>
                <Link to="/" className="m-5 outline-none custom-btn btn-1 text-xl">
                    홈
                </Link>
                <Link to="/focus-analysis" className="m-5 outline-none custom-btn btn-1 text-xl">
                    집중도 분석
                </Link>
                <Link to="/my-page" className="m-5 outline-none custom-btn btn-1 text-xl">
                    마이페이지
                </Link>
            </div>
        </nav>
    );
}
