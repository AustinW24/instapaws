import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { removePost } from "../store/posts"
import { FcCheckmark } from "react-icons/fc"
import './DeleteModal.css'


export default function DeleteModal({ post, setShowDeleteModal }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const { id } = useParams();

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

                <span className="delete-message">Are you sure?</span>
                <div className="checkmark"><FcCheckmark /></div>
                <div className="delete-buttons">
                    <button type="submit" className='confirm' > {'   '}confirm</button>
                    <button onClick={() => setShowDeleteModal(false)}>cancel</button>
                </div>
            </form>
        </>
    )
}
