import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { getAUser } from '../../store/users'
import { getAllPosts } from '../../store/posts'
import "./ProfilePage.css"

function User() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user)
    const userId = useParams();
    const posts = useSelector((state) => Object.values(state.posts));


    const numOfPosts = (posts) => {
        let count = 0;
        posts.map(post => {
            if (+post.user_id === currentUser.id) {
               count += 1
            }
        }
        )
        return count;
    }


    useEffect(() => {
        dispatch(getAUser)
    }, [dispatch])


    useEffect(() => {
        dispatch(getAllPosts())
    }, [dispatch])

    // console.log(posts)


    return (
        <>
            <div className="profile-header">
                <img className="profile-picture" src={currentUser.profile_picture} alt="profile"></img>
                <div className="user-Info"><h1 className="profile-username">{currentUser.username}</h1>
                    <div className="user-details"><strong>{numOfPosts(posts)}</strong>posts</div>
                    <strong>{currentUser.biography}</strong></div>
            </div>
            <div className="profile-body">
                {posts.slice(0).reverse().map((post, idx) => {

                    return (post.user_id === +userId.id) && (
                        <div className="picture-block" key={idx}>
                            <img alt="cat on dogs head" className="profile-images" src={post.picture_url}></img>
                        </div>
                    )
                })}
            </div>
        </>
    );
}
export default User;
