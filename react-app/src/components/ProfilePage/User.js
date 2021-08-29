import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { getAUser } from '../../store/users'
import NavBar from '../NavBar.js'
import "./ProfilePage.css"

function User() {
    const currentUser = useSelector(state => state.session.user)
    const [user, setUser] = ({})
    const { userId } = useParams();
    console.log(currentUser)
    console.log("USERRR", user)



    return (
        <div className="profile-header">
            <img src={currentUser.profile_picture} alt="profile photo"></img>
            <strong className="profile-username">{currentUser.username}</strong>
            <strong>{currentUser.biography}</strong>
        </div>

    );
}
export default User;
