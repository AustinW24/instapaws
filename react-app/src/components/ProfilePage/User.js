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

    console.log(currentUser.biography)
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





    return (

        <body>
            <div className="profile-header">
                <img className="profile-picture" src={user.profile_picture} alt="profile"></img>
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
            <hr className="hr-tag" style={{ 'border': '1px solid lightgray', width: '62%', 'margin-bottom': '60px'}}/>
            <div className="profile-body">
                {posts?.reverse().map((post, idx) => {

                    return (post?.user.id == +userId.id) && (
                        <div className="picture-block" key={idx}>
                           <Link to={`/posts/${post.id}`}><img alt="pictures of dogs and cats" className="profile-images" src={post.picture_url}></img></Link>
                        </div>
                    )
                })}
            </div>
            </body>
        
    );
}
export default User;
