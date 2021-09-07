import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { removePost } from "../store/posts"
import { FcCheckmark } from "react-icons/fc"
import './DeleteModal.css'


export default function DeleteModal({ post, setShowDeleteModal, setClicked }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleDelete = async (e) => {

        await dispatch(removePost(post.id))
        setShowDeleteModal(false);
        history.push("/home")
    }

    const exitModal = () => {
        setShowDeleteModal(false)
        setClicked(false)
    }


    return (
        <>
            <form className="deletemodal-form" type="form" onSubmit={handleDelete}>
                {/* <img src={posts.picture_url}></img> */}
                <div className="delete-content">
                    <span className="delete-message">Are you sure?</span>
                    <div className="checkmark"><FcCheckmark /></div>
                    <div className="delete-buttons">
                        <button type="submit" className='confirm' > {'   '}confirm</button>
                        <button onClick={exitModal}>cancel</button>
                    </div>
                </div>
            </form>
        </>
    )
}
