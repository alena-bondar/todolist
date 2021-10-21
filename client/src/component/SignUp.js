import React from 'react';
import {Link, Redirect} from "react-router-dom";
import {useForm} from "react-hook-form";
import AuthService from "../services/auth.service";

export default function SignUp(props) {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    let currentUser = AuthService.getCurrentUser();
    if (currentUser) {
        return (
            <Redirect to="/" />
        )
    }

    const onSubmit = (values) => {
        AuthService.register(values.email, values.password, values.name, values.lastName).then(
            () => {
                AuthService.login(values.email, values.password).then(
                    () => {
                        props.setIsOnline(true);
                    },
                    (error) => {

                    }
                );
            },
            (error) => {
            }
        );
    };
    return (
        <main className="form-signin text-center">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1 className="h3 mb-3 fw-normal">Sign Up</h1>
                <div className="form-floating">
                    <input type="email" {...register('email', { required: true })} className="form-control" id="floatingInput" placeholder="name@example.com" style={{ borderColor: errors.email && "red" }}/>
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating">
                    <input type="text" {...register('name', { required: true })} className="form-control" id="floatingPassword" placeholder="Name" style={{ borderColor: errors.name && "red" }}/>
                    <label htmlFor="floatingPassword">Name</label>
                </div>
                <div className="form-floating">
                    <input type="text" {...register('lastName', { required: true })} className="form-control" id="floatingPassword" placeholder="Last Name" style={{ borderColor: errors.lastName && "red" }}/>
                    <label htmlFor="floatingPassword">Last Name</label>
                </div>
                <div className="form-floating">
                    <input type="password" {...register('password', { required: true })} className="form-control" id="floatingPassword" placeholder="Password" style={{ borderColor: errors.password && "red" }}/>
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit">Sign Up</button>
                <p>or <Link to="/">Sign In</Link></p>
                <p className="mt-5 mb-3 text-muted">© 2021</p>
            </form>
        </main>
    );
}