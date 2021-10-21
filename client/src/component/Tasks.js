import React, { useState, useEffect } from 'react';
import Task from "../services/task.service";
import {Link} from "react-router-dom";
export default function Tasks() {

    const [tasks, setTasks] = useState([]);
    const [tasksLoaded, setTasksLoaded] = useState(false);
    const [sortDir, setSortDir] = useState('up');
    const [completedSortDir, setCompletedSortDir] = useState('up');

    useEffect(() => {
        if (!tasksLoaded) {
            Task.getAll().then(
                (res) => {
                    res.data.forEach(task => task.checked = false);
                    setTasks(res.data);
                    setTasksLoaded(true);
                },
                (error) => {

                }
            );
        }
    });


    const completeTask = (taskToComplete) => {
        taskToComplete.completed = true;
        Task.updateComplete(taskToComplete._id, taskToComplete.completed).then(
            (res) => {
                const newTasks = tasks.map(task => {
                    if (taskToComplete._id === task._id) {
                        return taskToComplete;
                    }

                    return task;
                })
                setTasks(newTasks);
            },
            (error) => {

            }
        );
    }

    const unCompleteTask = (taskToUncomplete) => {
        taskToUncomplete.completed = false;
        Task.updateComplete(taskToUncomplete._id, taskToUncomplete.completed).then(
            (res) => {
                const newTasks = tasks.map(task => {
                    if (taskToUncomplete._id === task._id) {
                        return taskToUncomplete;
                    }

                    return task;
                })
                setTasks(newTasks);
            },
            (error) => {

            }
        );
    }

    const removeTask = (taskToRemove) => {
        Task.remove(taskToRemove._id).then(
            (res) => {
                const newTasks = tasks.filter(task => {
                    return taskToRemove._id !== task._id;
                })
                setTasks(newTasks);
            },
            (error) => {

            }
        );
    }

    const checkAll = () => {
        const newTasks = tasks.map(task => {
            task.checked = true;

            return task;
        })
        setTasks(newTasks);
    }

    const uncheckAll = () => {
        const newTasks = tasks.map(task => {
            task.checked = false;

            return task;
        })
        setTasks(newTasks);
    }

    const handleCheck = (targetTask, checked) => {
        const newTasks = tasks.map(task => {
            if (targetTask._id === task._id) {
                task.checked = checked;
            }

            return task;
        })
        setTasks(newTasks);
    }

    const batchDelete = () => {
        const taskIdsToRemove = tasks.filter(task => {
            return task.checked;
        }).map(task => task._id);

        if (!taskIdsToRemove.length) {
            return;
        }

        Task.batchRemove(taskIdsToRemove).then(
            (res) => {
                const newTasks = tasks.filter(task => {
                    return !taskIdsToRemove.includes(task._id);
                })
                setTasks(newTasks);
            },
            (error) => {

            }
        );
    }

    const sortTask = () => {
        setSortDir(sortDir === 'up' ? 'down' : 'up');
    }

    const sortCompleted = () => {
        setCompletedSortDir(completedSortDir === 'up' ? 'down' : 'up');
    }

    const sortByTitle = (taskA, taskB) => {
        if (taskA.title > taskB.title) {
            return sortDir === 'up' ? 1 : -1;
        }
        if (taskA.title < taskB.title) {
            return sortDir === 'up' ? -1 : 1;
        }
        return 0;
    }

    const sortCompletedByTitle = (taskA, taskB) => {
        if (taskA.title > taskB.title) {
            return completedSortDir === 'up' ? 1 : -1;
        }
        if (taskA.title < taskB.title) {
            return completedSortDir === 'up' ? -1 : 1;
        }
        return 0;
    }

    return (
    <div className="container">
        <div className="row">
            <div className="col">
                <Link className="add btn btn-primary float-end" to="/new-task">Add New Task</Link>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <button type="button" onClick={checkAll} className="btn btn-secondary">Check All</button>
                <button type="button" onClick={uncheckAll} className="btn btn-secondary">Uncheck All</button>
                <button type="button" onClick={batchDelete} className="btn btn-secondary">Batch Delete</button>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <h4 className="card-title">Your Tasks <button className="btn" onClick={() => {sortTask()}}>{sortDir === 'up' ? <i className="bi bi-chevron-up" /> : <i className="bi bi-chevron-down" />}</button></h4>
                <ul className="list-group">
                    {
                        tasks.filter(task => !task.completed).sort(sortByTitle).map((task) => {
                            return (
                                <li key={task._id} className="list-group-item d-flex justify-content-between">
                                        <span>
                                            <input className="checkbox" type="checkbox" checked={task.checked} onChange={e => {handleCheck(task, e.target.checked)}} />
                                            <Link className="btn" to={{
                                                pathname: "/task",
                                                search: "?id=" + task._id
                                            }}>{task.title}</Link>

                                        </span>


                                    <span>
                                        <button className="btn btn-sm btn-bd-light" onClick={() => {completeTask(task)}}>complete</button>
                                        <Link className="btn" to={{
                                            pathname: "/edit-task",
                                            search: "?id=" + task._id
                                        }}><i className="bi bi-pencil" /></Link>
                                        <button className="btn" onClick={() => {removeTask(task)}}><i className="bi bi-x-lg" /></button>
                                    </span>

                                </li>
                            );
                        })
                    }
                </ul>
            </div>
            <div className="col">
                <h4 className="card-title">Completed Tasks <button className="btn" onClick={() => {sortCompleted()}}>{completedSortDir === 'up' ? <i className="bi bi-chevron-up" /> : <i className="bi bi-chevron-down" />}</button></h4>
                <ul className="list-group">
                    {
                        tasks.filter(task => task.completed).sort(sortCompletedByTitle).map((task) => {
                            return (
                                <li key={task._id} className="list-group-item d-flex justify-content-between">
                                        <span>
                                            <input className="checkbox" type="checkbox" checked={task.checked} onChange={e => {handleCheck(task, e.target.checked)}} />
                                            <Link className="btn" to={{
                                                pathname: "/task",
                                                search: "?id=" + task._id
                                            }}>{task.title}</Link>

                                        </span>


                                    <span>
                                        <button className="btn btn-sm btn-bd-light" onClick={() => {unCompleteTask(task)}}>uncomplete</button>
                                        <Link className="btn" to={{
                                            pathname: "/edit-task",
                                            search: "?id=" + task._id
                                        }}><i className="bi bi-pencil" /></Link>
                                        <button className="btn" onClick={() => {removeTask(task)}}><i className="bi bi-x-lg" /></button>
                                    </span>

                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        </div>
    </div>

    );
}