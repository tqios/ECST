import React from "react";
import { Link } from "react-router-dom";

export default function MenuNav() {
  return (
    <nav className="menu" style={{ textAlign: "center" }}>
      <div>
        <Link
          to={{
            pathname: "/home",
            state: {
              email:
                location.state?.email || localStorage.getItem("user_email"),
            },
          }}
          className="m-5 outline-none custom-btn btn-1 text-xl">
          홈
        </Link>
        <Link
          to={{
            pathname: "/focus-analysis",
            state: {
              email:
                location.state?.email || localStorage.getItem("user_email"),
            },
          }}
          className="m-5 outline-none custom-btn btn-1 text-xl">
          집중도 분석
        </Link>
        <Link
          to={{
            pathname: "/my-page",
            state: {
              email:
                location.state?.email || localStorage.getItem("user_email"),
            },
          }}
          className="m-5 outline-none custom-btn btn-1 text-xl">
          마이페이지
        </Link>
      </div>
    </nav>
  );
}
