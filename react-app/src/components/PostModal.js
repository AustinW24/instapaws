import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../store/posts"
import './PostModal.css'
import uploadlogo from ".././upload.png"


function PostModal({ setShowModal }) {
    const dispatch = useDispatch();

    const [caption, setCaption] = useState('');
    const [picture_url, setPictureUrl] = useState('');
    const [errors, setErrors] = useState([]);


    const handleSubmit = async (e) => {

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
                <div className="upload-span">Upload New Post</div>
                <hr className="upload-hr" />
                <textarea
                    placeholder='caption...'
                    type="text"
                    value={picture_url}
                    className="caption-input"
                    onChange={(e) => setPictureUrl(e.target.value)}
                    required
                />
                <label >
                    <input
                        className="image-input"
                        placeholder='img address...'
                        type="text"
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        required
                    />
                </label>
                <div className="post-buttons">
                    <button style={{width: "50%"}} type="submit" className='post-confirm' >{'   '}Create</button>
                    <button style={{width: "50%"}} className="post-cancel" onClick={() => setShowModal(false)}>Cancel</button>
                </div>
            </form>
        </>
    )

}


export default PostModal
