import React, { useState, useEffect } from 'react';
import moment from "moment";
import AuthService from "../services/auth.service";
import Task from "../services/task.service";
import {Redirect} from "react-router-dom";

export default function TaskPage() {
    const [currentTask, setCurrentTask] = useState(null);

    let currentUser = AuthService.getCurrentUser();


    useEffect(() => {

        if (!currentTask) {
            var url = new URL(window.location.href);
            var taskId = url.searchParams.get("id");
            console.log(taskId);

            Task.get(taskId).then(
                (res) => {
                    setCurrentTask(res.data);
                },
                (error) => {

                }
            );
        }
    });

    if (!currentTask) {
        return '';
    }

    if (!currentUser) {
        return (
            <Redirect to="/" />
        )
    }

    return (
        <div className="container">
            <table className="table">
                <tbody>
                <tr>
                    <th scope="row">Title</th>
                    <td>{currentTask.title}</td>
                </tr>
                <tr>
                    <th scope="row">Description</th>
                    <td>{currentTask.description}</td>
                </tr>
                <tr>
                    <th scope="row">Priority</th>
                    <td>{currentTask.priority}</td>
                </tr>
                <tr>
                    <th scope="row">Due Date</th>
                    <td>{currentTask.dueDate ? moment(currentTask.dueDate).format('YYYY-MM-DD') : ''}</td>
                </tr>
                </tbody>
            </table>
        </div>

    );
}