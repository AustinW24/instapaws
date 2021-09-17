import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { getAllPosts } from '../../store/posts'
import EditProfileModal from './EditProfile.js'
import Modal from '../../context/Modal'

import "./ProfilePage.css"

function User() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user)
    const posts = useSelector((state) => state.posts?.posts);
    const userId= useParams();
    const [update, setUpdate] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [clicked, setClicked] = useState(false);

    const [user, setUser] = useState({});

    useEffect(() => {
        if(!userId) {
            return;
        }
        (async () => {
            const response = await fetch(`/api/users/${userId.id}`);
            const user = await response.json();
            setUser(user)
        })();
    }, [userId])

     useEffect(() => {
        if (!posts) {
            dispatch((getAllPosts()))
        }
        }, [dispatch])

    useEffect(() => {
        (async () => {
            const response = await fetch(`/api/users/${userId.id}`);
            const user = await response.json();
            setUser(user);
        })();
        setUpdate(false)
    }, [currentUser, userId])

    const numOfPosts = (posts) => {
        let count = 0;
        posts?.map(post => {
            if (+post.user_id === user.id) {
               count += 1
            }
        }
        )
        return count;
    }

    const handleProfilePicture = () => {
        return
    }



    return (

        <div className="body">
            <div className="profile-banner">
            <div className="profile-header">
                <div className="profile-picture" style={{ backgroundImage: `url(${user.profile_picture})` }}></div>
                <div className="user-Info">
                    <div style={{"display": "flex"}}>
                    <h1 className="profile-username">{user.username}</h1>
                    <button  className="edit-profile-button" onClick={() => setShowProfileModal(true)}>Edit Profile</button>
                    </div>
                    {showProfileModal && (
                                <Modal  style={{ overlay: { background: 'black' } }} onClose={() => setShowProfileModal(false) }>
                                    <EditProfileModal userId={userId} currentUser={currentUser} setShowProfileModal={setShowProfileModal} setClicked={setClicked} />
                                </Modal>
                            )}
                <div className="user-details">
                    <strong>{numOfPosts(posts)}</strong>{"  "}posts</div>
                    <span className="bio">{user.biography}</span></div>
            </div>
            </div>
            <hr className="hr-tag" style={{ 'border': '1px solid lightgray', width: '840px', 'margin-bottom': '60px'}}/>
            <div className="profile-body">
                {posts?.reverse().map((post, idx) => {

                    return (post?.user.id == +userId.id) && (
                        <div className="picture-block" key={idx}>
                           <Link to={`/posts/${post.id}`}><div className="profile-images" style={{ backgroundImage: `url(${post?.picture_url})` }}></div></Link>
                        </div>
                    )
                })}
            </div>
            </div>

    );
}
export default User;
