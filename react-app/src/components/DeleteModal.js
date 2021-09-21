import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { removePost } from "../store/posts"
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
                <div className="delete-content">
                    <span  type="submit" className='delete-button' >Delete</span>
                   <hr className="hr-delete" style={{'width': '215px'}}/>
                    <div className="delete-buttons">
                        <button className="cancel-button" onClick={exitModal}>cancel</button>
                    </div>
                </div>
            </form>
        </>
    )
}
