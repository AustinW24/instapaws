import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import User from './components/ProfilePage/User';
import HomePage from './components/HomePage'
import Footer from './components/Footer'
import Post from './components/Post'
import { authenticate } from './store/session';

function App() {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            await dispatch(authenticate());
            setLoaded(true);
        })();
    }, [dispatch]);

    if (!loaded) {
        return null;
    }

    return (
        <BrowserRouter>
            <Switch>
                <Route path='/sign-up' exact={true}>
                    <SignUpForm />
                </Route>
                <Route path='/' exact={true}>
                    <LoginForm />
                    <Footer/>
                </Route>
                <ProtectedRoute path='/home' exact={true}>
                    <NavBar />
                    <HomePage />
                </ProtectedRoute>
                <ProtectedRoute exact={true} path='/users/:id'  >
                    <NavBar />.
                    <User />
                </ProtectedRoute>
                <ProtectedRoute exact={true} path='/posts/:id'>
                    <NavBar/>
                    <Post/>
                </ProtectedRoute>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
