import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Link } from "react-router-dom";
import { editPost } from "../store/posts"
import Modal from '../context/Modal'
import './EditModal.css'


export default function EditModal({ post, setShowModal }) {
    const dispatch = useDispatch();
    const [caption, setCaption] = useState("");

    const posts = useSelector((state) => Object.values(state.posts));

    const handleSubmit = async (e) => {
        e.preventDefault();

        const editedCaption = {
            id: post.id,
            caption: caption,
            user_id: post.user_id
        }

        await dispatch(editPost(editedCaption))
        setShowModal(false);
    }
    return (
        <>
            <form className="editmodal-form" type="form" onSubmit={handleSubmit}>
                {/* <img src={posts.picture_url}></img> */}
                <input
                    placeholder='change caption...'
                    type="text"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    required
                />

                <div className="edit-buttons">
                    <button type="submit" className='confirm' onChange={(e) => setCaption(e.target.value)}> {'   '}confirm</button>
                    <button onClick={() => setShowModal(false)}>cancel</button>
                </div>
            </form>
        </>
    )
}
