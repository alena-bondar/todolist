import React, { useState } from 'react';
import AuthService from "../services/auth.service";
import SignUp from './SignUp';
import SignIn from './SignIn';
import Home from './Home';
import NewTask from './NewTask';
import EditTask from './EditTask';
import TaskPage from './TaskPage';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import '../App.css';

export default function  App() {

    const currentUser = AuthService.getCurrentUser();

    const [isOnline, setIsOnline] = useState(!!currentUser);

    const logOut = () => {
        AuthService.logout();
        setIsOnline(false)
    };

    return (
        <div className="content-wrapper">
            <Router>
                <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
                    <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                        <svg className="bi me-2" width={40} height={32}><use xlinkHref="#bootstrap" /></svg>
                        <span className="fs-4">Home</span>
                    </a>
                    <ul className="nav nav-pills">
                        {currentUser ? <li className="nav-item"><p className="fs-6 hello-block">Hello, {currentUser.name} {currentUser.lastName}</p></li> : '' }

                        <li className="nav-item">
                            {isOnline ? <button className="nav-link" onClick={logOut}>Log Out</button> : '' }
                        </li>
                    </ul>
                </header>
                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Switch>
                    <Route path="/signup">
                        <SignUp />
                    </Route>
                    <Route path="/signin">
                        <SignIn setIsOnline={setIsOnline} />
                    </Route>
                    <Route path="/new-task">
                        <NewTask />
                    </Route>
                    <Route path="/edit-task">
                        <EditTask />
                    </Route>
                    <Route path="/task">
                        <TaskPage />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}