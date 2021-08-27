import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react"
import { getAllPosts } from '../../store/posts'
import { getAllUsers } from '../../store/users'
import './HomePage.css'

export default function HomePage() {
    const dispatch = useDispatch();
    const posts = useSelector((state) => Object.values(state.posts));
    const user = useSelector(state => state.session.user);
    const allUsers = useSelector(state => Object.values(state.users))
    console.log("ALL USERS", allUsers)

    useEffect(() => {
        dispatch(getAllPosts())
    }, [dispatch])

    // useEffect(() => {
    //     dispatch(getAllUsers())
    // }, [dispatch])


    return (
        <>
            <div className='home-container'>
                <h1>Home feed</h1>
                <ul className='post-list'>
                    {posts.map((post, idx) => {
                        return (
                            <li key={idx} className="indv-post">
                                {post.user_id}
                                <img alt="users post" src={post.picture_url} className="indv-photo"></img>
                                {post.caption}
                            </li>
                        )
                    })}
                </ul>

            </div>

        </>
    )

}
