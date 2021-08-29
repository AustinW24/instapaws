import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Link } from "react-router-dom";
import { removePost } from "../store/posts"
import Modal from '../context/Modal'
import './DeleteModal.css'


export default function DeleteModal({ post, setShowDeleteModal }) {
    const dispatch = useDispatch();
    const history = useHistory();

    // const posts = useSelector((state) => Object.values(state.posts));

    const handleDelete = async (e) => {

        await dispatch(removePost(post.id))
        setShowDeleteModal(false);
        history.push("/home")
    }
    return (
        <>
            <form className="deletemodal-form" type="form" onSubmit={handleDelete}>
                {/* <img src={posts.picture_url}></img> */}
                <span className="delete-message">Are you sure you want to delete this?</span>

                <div className="delete-buttons">
                    <button type="submit" className='confirm' > {'   '}confirm</button>
                    <button onClick={() => setShowDeleteModal(false)}>cancel</button>
                </div>
            </form>
        </>
    )
}
