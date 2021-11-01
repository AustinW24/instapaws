import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { createPost } from "../store/posts"
import FileUploader from './FileUploader'
import './PostModal.css'
import './FileUploader/FileUploader.css'


function PostModal({ setShowModal }) {
    const dispatch = useDispatch();

    const [caption, setCaption] = useState('');
    const [picture_url, setPictureUrl] = useState("");
    const [errors, setErrors] = useState([]);


    const onSubmit = async (e) => {

        await dispatch(createPost(picture_url, caption))
        setShowModal(false);
    }

    return (
        <>

            <form action="#" id="#" className='postmodal-form' onSubmit={onSubmit}>
                <div className="post-errors">
                    {errors.map(error => (
                        <li>{error}</li>
                    ))}
                </div>
                <div >
                    <div className="upload-span">Upload New Post</div>
                    <hr className="upload-hr" />
                    <textarea
                        placeholder='caption...'
                        type="text"
                        value={caption}
                        className="caption-input"
                        onChange={(e) => setCaption(e.target.value)}
                        required
                    />
                        <input
                        className="image-input"
                        placeholder='img address...'
                        type="text"
                        value={picture_url}
                        onChange={(e) => setPictureUrl(e.target.value)}
                        required
                    />
                        {/* <input
                            type="file"
                            ref={register}
                            className="form-control"
                            multiple="" /> */}

                    <div className="post-buttons">
                        <button style={{ width: "50%" }} type="submit" className='post-confirm' >{'   '}Create</button>
                        <button style={{ width: "50%" }} className="post-cancel" onClick={() => setShowModal(false)}>Cancel</button>
                    </div>
                </div>
            </form>
        </>
    )

}


export default PostModal
