import React, { useState } from "react";
import { useDispatch } from "react-redux";
import './PostModal.css'
// import { createPost } from '.././store/posts'

function PostModal({post, setShowModal}) {
    const dispatch = useDispatch();
    const [caption, setCaption] = useState('');
    const [url, setUrl] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        post.caption = caption;
        // await dispatch(createPost(post))
        setShowModal(false);
    }

    return (
        <>
            <form className='postmodal-form' onSubmit={handleSubmit}>
            <label className='post-image'>
                    Image: {' '}
                    <input
                        placeholder='Image Url...'
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
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
                <button type="submit" className='confirm' >{'   '}Confirm Change</button>
            </form>
        </>
    )

}


export default PostModal
