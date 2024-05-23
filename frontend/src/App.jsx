import "./App.css";
import Login from "./Page/Login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from "react-router-dom";

import Signup from "./Page/Signup";
import Home from "./Page/Home.jsx";
import Focus from "./Page/Focus.jsx";
import Mypage from "./Page/Mypage.jsx";

function App() {
  const handleLogoClick = (event) => {
    if (window.location.pathname === "/home") {
      event.preventDefault(); // 기본 링크 동작을 막음
      window.location.reload(); // 새로고침
    }
  };

  return (
    <Router>
      {/* 공통 헤더
        <header className="flex justify-between items-center">
          <div className="text-5xl font-bold ml-6">
            <Link to="/home" onClick={handleLogoClick}>
              <h1>Learning Mate</h1>
            </Link>
          </div>
        </header> */}
      <Switch>
        <Route path="/login">
          <Login />
        </Route>

        <Route path="/signup">
          <Signup />
        </Route>

        <Route path="/focus-analysis">
          <Focus />
        </Route>

        <Route path="/my-page">
          <Mypage />
        </Route>

        <Route path="/">
          <Home />
        </Route>
        <Redirect from="/" to="/login" />
      </Switch>
    </Router>
  );
}

export default App;
