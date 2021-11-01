import React, { useEffect, useState, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import OutsideClickHandler from 'react-outside-click-handler'
import { getAllPosts } from '../../store/posts'
import { getAUser } from '../../store/users'
import EditProfileModal from './EditProfile.js'
import FollowerModal from '../FollowModals/Followers'
import FollowingModal from '../FollowModals/Following'
import Modal from '../../context/Modal'
import "./ProfilePage.css"

function User() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user)
    const posts = useSelector((state) => state.posts?.posts);
    const userId = useParams();
    const id = Number(userId.id);
    const [update, setUpdate] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [showFollowerModal, setShowFollowerModal] = useState(false);
    const [showFollowingModal, setShowFollowingModal] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [isFollowing, setIsFollowing] = useState(
        currentUser.follows.map((u) => +u.id).includes(id)
    );


    const [user, setUser] = useState({});
    const ref = useRef();


    useEffect(() => {
        if (!userId) {
            return;
        }
        (async () => {
            const response = await fetch(`/api/users/${id}`);
            const user = await response.json();
            setUser(user)
        })();
    }, [id])


    useEffect(() => {
        (async () => {
            const response = await fetch(`/api/users/${id}`);
            const user = await response.json();
            setUser(user);
        })();
        setUpdate(false)

    }, [currentUser, id, isFollowing])

    useEffect(() => {
        if (!posts) {
            dispatch((getAllPosts()))
        }
    }, [dispatch])



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

        const response = await fetch(`/api/users/${id}/follow`)
        const userObj = await response.json();
        getAUser({ ...userObj.otherUser });
        setIsFollowing(!isFollowing)
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
                            {+id !== +currentUser.id && (isFollowing ? (
                                <button className='follow-button' onClick={handleFollow}><strong>Unfollow</strong></button>
                                ) : (
                                    <button className='follow-button' onClick={handleFollow}><strong>Follow</strong></button>
                                    ))}
                        </div>
                            <OutsideClickHandler onOutsideClick={() => {
                              setShowProfileModal(false)
                                }}>
                        {showProfileModal  && (
                            <Modal style={{ overlay: { background: 'black' } }} onClose={() => setShowProfileModal(false)}>
                                <EditProfileModal currentUser={currentUser} setShowProfileModal={setShowProfileModal} setClicked={setClicked} />
                            </Modal>
                        )}
                        </OutsideClickHandler>

                        <div className="user-details">
                            <strong>{numOfPosts(posts)}</strong>{"  "}<span style={{ "fontSize": "16px" }}>posts</span>
                            <strong style={{ "marginLeft": "2.3rem" }}>{user.followers?.length}</strong>{"  "}<span onClick={() => setShowFollowerModal(!showFollowerModal)} style={{ "fontSize": "16px", "cursor": "pointer" }}>followers</span>
                            <strong style={{ "marginLeft": "2.3rem" }}>{user.follows?.length}</strong>{"  "}<span onClick={() => setShowFollowingModal(!showFollowingModal)} style={{ "fontSize": "16px", "cursor": "pointer" }}>following</span>
                        </div>
                        {showFollowerModal && (
                            <Modal onClose={() => setShowFollowerModal(false)}>
                                <FollowerModal  userId={userId} setShowFollowerModal={setShowFollowerModal} setClicked={setClicked} />
                            </Modal>
                        )}
                        {showFollowingModal && (
                            <Modal onClose={() => setShowFollowingModal(false)}>
                                <FollowingModal userId={userId} setShowFollowingModal={setShowFollowingModal} setClicked={setClicked} />
                            </Modal>
                        )}

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
