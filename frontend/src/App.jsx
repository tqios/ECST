import './App.css';
import Login from "./Page/Login";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Signup from "./Page/Signup";
import Home from "./Page/Home.jsx"
import Focus from "./Page/Focus.jsx";
import Mypage from "./Page/Mypage.jsx";

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/login">
                    <Login/>

                </Route>

                <Route path="/signup">
                    <Signup/>
                </Route>

                <Route path="/focus-analysis">
                    <Focus/>
                </Route>

                <Route path="/my-page">
                    <Mypage/>
                </Route>

                <Route path="/">
                    <Home/>
                </Route>

            </Switch>
        </Router>
    );
}

export default App;