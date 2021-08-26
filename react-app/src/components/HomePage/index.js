import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react"
import { getAllPosts } from '../../store/posts'
import './HomePage.css'

export default function HomePage() {
    const dispatch = useDispatch();
    const posts = useSelector((state) => Object.values(state.posts));
    const user = useSelector(state => state.session.user);

   useEffect(() => {
       dispatch(getAllPosts())
   }, [dispatch])


    return (
        <>
            <div className='home-container'>
                <h1>HELLOOOO</h1>
            </div>
        </>
    )

}
