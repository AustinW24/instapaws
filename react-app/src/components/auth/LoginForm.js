import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import phones from './instapawsplash2.png'
import logo from '../../instapaw.png'
import './LoginForm.css'


const LoginForm = () => {
    const [errors, setErrors] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const onLogin = async (e) => {
        e.preventDefault();
        const data = await dispatch(login(email, password));
        if (data) {
            setErrors(data);
        }
    };

    const updateEmail = (e) => {
        setEmail(e.target.value);
    };

    const updatePassword = (e) => {
        setPassword(e.target.value);
    };

    if (user) {
        return <Redirect to='/home' />;
    }

    return (
        <div className='login-container'>
            <img alt="two phones" src={phones} className='twophones'></img>
            <form onSubmit={onLogin} className='login-form'>
                <img alt="instapaws logo" className='logo' src={logo}></img>
                <div className='errors'>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <div className='txt-field'>
                    <input
                        name='email'
                        type='text'
                        placeholder='email...'
                        value={email}
                        onChange={updateEmail}
                    />
                </div>
                <div className='txt-field'>

                    <input
                        name='password'
                        type='password'
                        placeholder='password...'
                        value={password}
                        onChange={updatePassword}
                    />
                </div>
                    <button className='login-button' type='submit'>Login</button>
                    <p>Don't have an account? <a href="/sign-up">Sign up</a></p>
            </form>
        </div>
    );
};

export default LoginForm;
