import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { getAllPosts } from '../../store/posts'
import { getAUser, getFollowers } from '../../store/users'
import EditProfileModal from './EditProfile.js'
import Modal from '../../context/Modal'

import "./ProfilePage.css"

function User() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user)
    const posts = useSelector((state) => state.posts?.posts);
    const userId = useParams();
    const id = Number(userId.id)
    const [update, setUpdate] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [isFollowing, setIsFollowing] = useState(
        currentUser.follows.map((u) => +u.id).includes(id)
    );
    const [followbtn, setFollowBtn] = useState('Follow')

    const [user, setUser] = useState({});

    useEffect(() => {
        if (!userId) {
            return;
        }
        (async () => {
            const response = await fetch(`/api/users/${id}`);
            const user = await response.json();
            setUser(user)
        })();
    }, [id, followbtn])


    useEffect(() => {
        (async () => {
            const response = await fetch(`/api/users/${id}`);
            const user = await response.json();
            setUser(user);
        })();
        setUpdate(false)
        if (user.id !== currentUser.id && !isFollowing) {
            setFollowBtn("Follow")
        } else {
            setFollowBtn("Unfollow")
        }
    }, [currentUser, id, followbtn])

    useEffect(() => {
        if(followbtn){
            getAUser(id)
        }
    }, [dispatch, followbtn])


    useEffect(() => {
        if (!posts) {
            dispatch((getAllPosts()))
        }
    }, [dispatch, followbtn])



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

    const handleFollow = async () => {
        if (followbtn === "Unfollow") {
            setFollowBtn("Follow")
        } else {
            setFollowBtn("Unfollow")
        }
        const response = await fetch(`/api/users/${id}/follow`)
        const userObj = await response.json();
        getAUser({ ...userObj.otherUser });
    }



    return (

        <div className="body">
            <div className="profile-banner">
                <div className="profile-header">
                    <div className="profile-picture" style={{ backgroundImage: `url(${user.profile_picture})` }}></div>
                    <div className="user-Info">
                        <div style={{ "display": "flex" }}>
                            <h1 className="profile-username">{user.username}</h1>
                            {user.id === currentUser.id &&
                                <button className="edit-profile-button" onClick={() => setShowProfileModal(true)}>Edit Profile</button>
                            }
                                <button className="follow-button" onClick={handleFollow}>{followbtn}</button>
                        </div>
                        {showProfileModal && (
                            <Modal style={{ overlay: { background: 'black' } }} onClose={() => setShowProfileModal(false)}>
                                <EditProfileModal currentUser={currentUser} setShowProfileModal={setShowProfileModal} setClicked={setClicked} />
                            </Modal>
                        )}
                        <div className="user-details">
                            <strong>{numOfPosts(posts)}</strong>{"  "}<span style={{ "fontSize": "16px" }}>posts</span>
                            <strong style={{ "marginLeft": "2.3rem" }}>{user.followers?.length}</strong>{"  "}<span style={{ "fontSize": "16px" }}>followers</span>
                            <strong style={{ "marginLeft": "2.3rem" }}>{user.follows?.length}</strong>{"  "}<span style={{ "fontSize": "16px" }}>following</span>
                        </div>

                        <span className="bio">{user.biography}</span></div>
                </div>
            </div>
            <hr className="hr-tag" style={{ 'border': '1px solid lightgray', width: '840px', 'marginBottom': '60px' }} />
            <div className="profile-body">
                {posts?.slice(0).reverse().map((post, idx) => {

                    return (post?.user.id === +userId.id) && (
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
