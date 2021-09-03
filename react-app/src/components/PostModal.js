import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../store/posts"
import './PostModal.css'
import uploadlogo from ".././upload.png"
// import { createPost } from '.././store/posts'

function PostModal({setShowModal }) {
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
                <div className='post-image'>
                    <img  className="upload-logo" src={uploadlogo}></img>
                    <input
                        placeholder='caption...'
                        type="text"
                        value={picture_url}
                        className="caption-input"
                        onChange={(e) => setPictureUrl(e.target.value)}
                        required
                    />
                <label >

                    <input
                        placeholder='img address...'
                        type="text"
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        required
                        />
                </label>
                        </div>
                <div className="post-buttons">
                    <button type="submit" className='confirm' >{'   '}Create</button>
                    <button onClick={() => setShowModal(false)}>Cancel</button>
                </div>
            </form>
        </>
    )

}


export default PostModal
