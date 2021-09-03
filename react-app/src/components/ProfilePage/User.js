import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { getAUser } from '../../store/users'
import { getAllPosts } from '../../store/posts'
import "./ProfilePage.css"

function User() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user)
    const userId= useParams();
    const posts = useSelector((state) => state.posts?.posts);
    console.log(userId)

    const numOfPosts = (posts) => {
        let count = 0;
        posts?.map(post => {
            if (+post.user_id === currentUser.id) {
               count += 1
            }
        }
        )
        return count;
    }
    console.log(posts, "POSTS")

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
                    <div className="user-details"><strong>{numOfPosts(posts)}</strong>{"  "}posts</div>
                    <span className="bio">{currentUser.biography}</span></div>
            </div>
            <div className="profile-body">
                {posts?.reverse().map((post, idx) => {

                    <h1>HELLO</h1>

                    return (post?.user.id == +userId.id) && (
                        <div className="picture-block" key={idx}>
                           <Link to={`/posts/${post.id}`}><img alt="cat on dogs head" className="profile-images" src={post.picture_url}></img></Link>
                        </div>
                    )
                })}
            </div>
        </>
    );
}
export default User;
