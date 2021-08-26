
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Link } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import LoginForm from './auth/LoginForm';
import Modal from '.././context/Modal'
import PostModal from './PostModal'
import './NavBar.css'
import './PostModal.css'
import logo from '../instapaw.png'

const NavBar = () => {
    const current_user = useSelector(state => state.session.user);
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    // const username = current_user.username
    useEffect(() => {
        setShowModal()
    }, [dispatch])

    return (
        <header>
            <nav className='navigation'>
                {current_user &&
                    <Link to='/home' onClick={() => setShowModal(false)}>
                        <img className='insta-logo' src={logo} alt='logo-main'></img>
                    </Link>
                }
                {!current_user &&
                    <Link to='/'>
                        <img className='insta-logo' src={logo} alt='logo-main-alt'></img>
                    </Link>
                }
                <ul>
                    {!current_user &&
                        <>
                            <li>
                                <NavLink to='/' exact={true} onClick={() => setShowModal(true)} activeClassName='active'>
                                    Sign In
                                </NavLink>
                                {showModal && (
                                    <Modal onClose={() => setShowModal(false)}>
                                        <LoginForm setShowModal={setShowModal} />
                                    </Modal>
                                )}
                            </li>
                            <li>
                                <NavLink to='/sign-up' exact={true} activeClassName='active'>
                                    Create Account
                                </NavLink>
                            </li>
                        </>
                    }
                    {current_user &&
                        <>
                            <li>
                                <button onClick={() => setShowModal(true)} >Upload</button>
                                {showModal && (
                                    <Modal onClose={() => setShowModal(false)}>
                                        <PostModal setShowModal={setShowModal} />
                                    </Modal>
                                )}
                            </li>
                            <li>
                                <NavLink to={"/my-profile"} onClick={() => setShowModal(false)} exact={true} activeClassName='active'>
                                    profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={"/"} onClick={() => setShowModal(false)} exact={true} activeClassName='active'>
                                    <LogoutButton />
                                </NavLink>
                            </li>
                        </>
                    }
                </ul>
            </nav>
        </header >

    );
}

export default NavBar;
