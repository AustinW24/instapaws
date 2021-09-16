import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { editPost } from "../store/posts"
import './EditModal.css'


export default function EditModal({ post, setShowEditModal, setClicked }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [caption, setCaption] = useState(post.caption);

    const handleSubmit = async (e) => {


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

                <textarea
                    placeholder='change caption...'
                    type="text"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    className="postmodal-caption"

                />

                <div className="edit-buttons">
                    <button type="submit" className='confirm' onChange={(e) => setCaption(e.target.value)}> {'   '}confirm</button>
                    <button onClick={exitModal}>cancel</button>
                </div>
            </form>
        </>
    )
}
