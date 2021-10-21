import React  from 'react';
import {Link, Redirect} from "react-router-dom";
import {useForm} from "react-hook-form";
import AuthService from "../services/auth.service";

export default function SignIn(props) {
    const { register, handleSubmit, formState: { errors } } = useForm();

    let currentUser = AuthService.getCurrentUser();
    if (currentUser) {
        return (
            <Redirect to="/" />
        )
    }

    const onSubmit = (values) => {
        AuthService.login(values.email, values.password).then(
            () => {
                props.setIsOnline(true);
            },
            (error) => {

            }
        );
    };
    return (
        <main className="form-signin text-center">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
                <div className="form-floating">
                    <input {...register('email', { required: true })} type="email" className="form-control" id="floatingInput" placeholder="name@example.com" style={{ borderColor: errors.email && "red" }} />
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating">
                    <input {...register('password', { required: true })} type="password" className="form-control" id="floatingPassword" placeholder="Password" style={{borderColor: errors.password && "red" }} />
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                <p>or <Link to="/signup">Sign Up</Link></p>
                <p className="mt-5 mb-3 text-muted">© 2021</p>
            </form>
        </main>
    );
}