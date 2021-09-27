import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { removePost } from "../store/posts"
import './DeleteModal.css'


export default function DeleteModal({ post, setShowDeleteModal, setClicked }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [isOpen, setIsOpen] = useState({})

    const handleDelete = async () => {
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
                    <button type="submit" className='delete-button'>Delete</button>
                    <hr className="hr-delete" style={{ 'width': '215px', 'opacity': '0.4' }} />
                        <button className="cancel-button" onClick={exitModal}>Cancel</button>
                </div>
            </form>
        </>
    )
}
