import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { getAllPosts } from '../../store/posts'

import "./ProfilePage.css"

function User() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user)
    const posts = useSelector((state) => state.posts?.posts);
    const userId= useParams();
    const [update, setUpdate] = useState(false)
    const [user, setUser] = useState({});
    // console.log(posts)
    // console.log(userId, "userId")

    useEffect(() => {
        if(!userId) {
            return;
        }
        (async () => {
            const response = await fetch(`/api/users/${userId.id}`);
            const user = await response.json();
            setUser(user, "usa")
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



    console.log(posts, "POSTS")

    return (
        <>
            <div className="profile-header">
                <img className="profile-picture" src={user.profile_picture} alt="profile"></img>
                <div className="user-Info"><h1 className="profile-username">{user.username}</h1>
                    <div className="user-details"><strong>{numOfPosts(posts)}</strong>{"  "}posts</div>
                    <span className="bio">{user.biography}</span></div>
            </div>
            <div className="profile-body">
                {posts?.reverse().map((post, idx) => {

                    return (post?.user.id == +userId.id) && (
                        <div className="picture-block" key={idx}>
                           <Link to={`/posts/${post.id}`}><img alt="pictures of dogs and cats" className="profile-images" src={post.picture_url}></img></Link>
                        </div>
                    )
                })}
            </div>
        </>
    );
}
export default User;
