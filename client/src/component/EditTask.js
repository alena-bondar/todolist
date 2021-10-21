import React, { useState, useEffect } from 'react';
import moment from "moment";
import {Redirect} from "react-router-dom";
import {useForm} from "react-hook-form";
import AuthService from "../services/auth.service";
import Task from "../services/task.service";

export default function EditTask() {
    const {register, handleSubmit, formState: { errors } } = useForm();
    const [currentTask, setCurrentTask] = useState(null);
    const [isTaskUpdated, setIsTaskUpdated] = useState(false);

    let currentUser = AuthService.getCurrentUser();


    useEffect(() => {

        if (!currentTask) {
            var url = new URL(window.location.href);
            var taskId = url.searchParams.get("id");

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

    if (!currentUser || isTaskUpdated) {
        return (
            <Redirect to="/" />
        )
    }

    const changeTitle = e => {
        setCurrentTask(Object.assign({}, currentTask, {title: e.target.value}));
    };

    const changeDescription = e => {
        setCurrentTask(Object.assign({}, currentTask, {description: e.target.value}));
    };

    const changePriority = e => {
        setCurrentTask(Object.assign({}, currentTask, {priority: e.target.value}));
    };

    const changeDueDate = e => {
        setCurrentTask(Object.assign({}, currentTask, {dueDate: e.target.value}));
    };

    const onSubmit = (values) => {
        Task.update(currentTask._id, values.title, values.description, values.priority, values.dueDate).then(
            (res) => {
                setIsTaskUpdated(true);
            },
            (error) => {

            }
        );
    };


    return (
        <main className="form-signin text-center">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1 className="h3 mb-3 fw-normal">Edit Task</h1>
                <div className="form-floating">
                    <input type="text" name="title" {...register('title', { required: true })} value={currentTask.title} onChange={changeTitle} className="form-control" id="floatingInput" placeholder="Title" style={{ borderColor: errors.title && "red" }}/>
                    <label htmlFor="floatingInput">Title</label>
                </div>
                <div className="form-floating">
                    <input type="text" name="description" {...register('description')} value={currentTask.description} onChange={changeDescription} className="form-control" id="floatingInput" placeholder="Description" style={{ borderColor: errors.description && "red" }}/>
                    <label htmlFor="floatingPassword">Description</label>
                </div>
                <div className="form-floating">
                    <input type="number" {...register('priority')} value={currentTask.priority} onChange={changePriority} className="form-control" id="floatingInput" placeholder="Priority" style={{ borderColor: errors.priority && "red" }}/>
                    <label htmlFor="floatingPassword">Priority</label>
                </div>
                <div className="form-floating">
                    <input type="date" {...register('dueDate')} value={currentTask.dueDate ? moment(currentTask.dueDate).format('YYYY-MM-DD') : ''} onChange={changeDueDate} className="form-control" id="floatingPassword" style={{ borderColor: errors.dueDate && "red" }}/>
                    <label htmlFor="floatingPassword">Due Date</label>
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
            </form>
        </main>
    );
}