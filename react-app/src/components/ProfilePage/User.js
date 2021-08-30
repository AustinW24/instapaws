import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { getAUser } from '../../store/users'
import { getPosts } from '../../store/posts'
import NavBar from '../NavBar.js'
import "./ProfilePage.css"

function User() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user)
    const { userId } = useParams();
    const posts = useSelector(state => state.posts)
    console.log(posts)
    const count = 0;

    useEffect(() => {
        dispatch(getAUser)
    }, [dispatch])


    return (
        <div className="profile-header">


            <img className="profile-picture" src={currentUser.profile_picture} alt="profile"></img>
            <div className="user-Info"><h1 className="profile-username">{currentUser.username}</h1>
            <strong>{currentUser.biography}</strong></div>

        </div>

    );
}
export default User;
