import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from './NavBar.js'

function User() {
    const [user, setUser] = useState({});
    const { userId } = useParams();

    // useEffect(() => {
    //     if (!userId) {
    //         return;
    //     }
    //     (async () => {
    //         const response = await fetch(`/api/users/${userId}`);
    //         const user = await response.json();
    //         setUser(user);
    //     })();
    // }, [userId]);

    // if (!user) {
    //     return null;
    // }

    return (
        <div>
            <img src={user.profile_picture} alt="profile photo"></img>
            <strong>{user.username}</strong>
            <strong>{user.biography}</strong>
        </div>

    );
}
export default User;
