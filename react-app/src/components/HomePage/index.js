import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react"
import { getPosts, getAllPosts, setPost, createPost, removePost, likePost } from '../../store/posts'

export default function HomePage() {
    const dispatch = useDispatch()
    const posts = useSelector((state) => Object.values(state.posts))
    const user = useSelector(state => state.session.user)

    // console.log(posts)

    return (
        <>
        </>
    )

}
