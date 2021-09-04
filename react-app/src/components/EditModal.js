import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editPost } from "../store/posts"
import './EditModal.css'
import editlogo from '.././edit.png'


export default function EditModal({ post, setShowEditModal, setClicked }) {
    const dispatch = useDispatch();

    const [caption, setCaption] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();

        const editedCaption = {
            id: post.id,
            caption: caption,
            user_id: post.user_id
        }

        await dispatch(editPost(editedCaption))
        setShowEditModal(false);
    }

        const exitModal = () => {
        setShowEditModal(false)
        setClicked(false)
    }

    return (
        <>
            <form className="editmodal-form" type="form" onSubmit={handleSubmit}>
                <img className="editlogo" src={editlogo}></img>
                <input
                    placeholder='change caption...'
                    type="text"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    className="postmodal-caption"
                    required
                />

                <div className="edit-buttons">
                    <button type="submit" className='confirm' onChange={(e) => setCaption(e.target.value)}> {'   '}confirm</button>
                    <button onClick={exitModal}>cancel</button>
                </div>
            </form>
        </>
    )
}
