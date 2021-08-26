import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "./../store/posts"
import Modal from '.././context/Modal'
import './PostModal.css'
// import { createPost } from '.././store/posts'

function PostModal({ post, setShowModal }) {
    const dispatch = useDispatch();
    const [caption, setCaption] = useState('');
    const [picture_url, setPictureUrl] = useState('');
    const [errors, setErrors] = useState([]);
    const current_user = useSelector(state => state.session.user);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(createPost(caption, picture_url))
        setShowModal(false);
    }

    return (
        <>
            <form className='postmodal-form' onSubmit={handleSubmit}>
                <div className="post-errors">
                    {errors.map(error => (
                        <li>{error}</li>
                    ))}
                </div>
                <label className='post-image'>
                    Image: {' '}
                    <input
                        placeholder='Image Url...'
                        type="text"
                        value={picture_url}
                        onChange={(e) => setPictureUrl(e.target.value)}
                        required
                    />
                </label>
                <label className='post-caption'>
                    Caption: {' '}
                    <input
                        placeholder='Caption...'
                        type="text"
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        required
                    />
                </label>
                <button type="submit" className='confirm' >{'   '}Create</button>
                <button onClick={() => setShowModal(false)}>Cancel</button>
            </form>
        </>
    )

}


export default PostModal
