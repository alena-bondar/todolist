import React, { useState} from 'react';
import {Redirect} from "react-router-dom";
import {useForm} from "react-hook-form";
import AuthService from "../services/auth.service";
import Task from "../services/task.service";

export default function NewTask() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [isTaskCreated, setIsTaskCreated] = useState(false);

    let currentUser = AuthService.getCurrentUser();
    if (!currentUser || isTaskCreated) {
        return (
            <Redirect to="/" />
        )
    }

    const onSubmit = (values) => {
        Task.create(values.title, values.description, values.priority, values.dueDate).then(
            (res) => {
                setIsTaskCreated(true);
            },
            (error) => {

            }
        );
    };
    return (
        <main className="form-signin text-center">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1 className="h3 mb-3 fw-normal">New Task</h1>
                <div className="form-floating">
                    <input type="text" {...register('title', { required: true })} className="form-control" id="floatingInput" placeholder="Title" style={{ borderColor: errors.title && "red" }}/>
                    <label htmlFor="floatingInput">Title</label>
                </div>
                <div className="form-floating">
                    <input type="text" {...register('description')} className="form-control" id="floatingInput" placeholder="Description" style={{ borderColor: errors.description && "red" }}/>
                    <label htmlFor="floatingPassword">Description</label>
                </div>
                <div className="form-floating">
                    <input type="number" {...register('priority')} className="form-control" id="floatingInput" placeholder="Priority" style={{ borderColor: errors.priority && "red" }}/>
                    <label htmlFor="floatingPassword">Priority</label>
                </div>
                <div className="form-floating">
                    <input type="date" {...register('dueDate')} className="form-control" id="floatingPassword" placeholder="Date" style={{ borderColor: errors.dueDate && "red" }}/>
                    <label htmlFor="floatingPassword">Due Date</label>
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
            </form>
        </main>
    );
}