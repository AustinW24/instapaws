import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp, login } from '../../store/session';
import './SignUpForm.css'

const SignUpForm = () => {
    const [errors, setErrors] = useState([]);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();



    const onSignUp = async (e) => {
        e.preventDefault();
        if (password === repeatPassword) {
            const data = await dispatch(signUp(username, email, password));
            if (data) {
                console.log(data)
                setErrors(data)
            } else if (!data.email.include("@")) {
                setErrors(['Please enter a valid email address'])
            }
        } else {
            setErrors(["Passwords do not match!"])
        }
    };

    const updateUsername = (e) => {
        setUsername(e.target.value);
    };

    const updateEmail = (e) => {
        setEmail(e.target.value);
    };

    const updatePassword = (e) => {
        setPassword(e.target.value);
    };

    const updateRepeatPassword = (e) => {
        setRepeatPassword(e.target.value);
    };


    if (user) {
        return <Redirect to='/home' />;
    }



    return (

        <form onSubmit={onSignUp} className='signup-form'>
            <h1 className="create-account">Create an account</h1>
            <div className="signup-errors">
                {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>
            <div>
                <label className="signup-label">Username</label>
                <input
                    type='text'
                    name='username'
                    onChange={updateUsername}
                    value={username}
                    className="signup-input"
                ></input>
            </div>
            <div>
                <label className="signup-label">Email</label>
                <input
                    type='text'
                    name='email'
                    onChange={updateEmail}
                    value={email}
                    className="signup-input"

                ></input>
            </div>
            <div className="passwords">
                <label className="signup-label">Password</label>
                <input
                    type='password'
                    name='password'
                    onChange={updatePassword}
                    value={password}
                    className="signup-input"

                ></input>

                <label className="signup-label">Confirm Password</label>
                <input
                    type='password'
                    name='repeat_password'
                    onChange={updateRepeatPassword}
                    value={repeatPassword}
                    required={true}
                    className="signup-input"

                ></input>
            </div>
            <button className="signup-button" type='submit'>Sign Up</button>
        </form>
    );
};

export default SignUpForm;
