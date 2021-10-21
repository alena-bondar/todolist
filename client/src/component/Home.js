import React from 'react';
import {Redirect} from "react-router-dom";
import AuthService from "../services/auth.service";
import Tasks from "./Tasks";

export default function Home(props) {
    let currentUser = AuthService.getCurrentUser();
    if (!currentUser) {
        return (
            <Redirect to="/signin" />
        )
    }

    return (
        <Tasks/>
    );
}