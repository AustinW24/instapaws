import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../store/posts"
import './PostModal.css'
import FileUploader from './FileUploader'
import './FileUploader/FileUploader.css'


function PostModal({ setShowModal }) {
    const dispatch = useDispatch();

    const [caption, setCaption] = useState('');
    const [picture_url, setPictureUrl] = useState(null);
    const [errors, setErrors] = useState([]);
    // const [file, setFile] = useState(null);


    const onInputChange = (e) => {

        setPictureUrl(e.target.files)
        console.log(e.target.files)
    };

    const handleSubmit = async (e) => {
        await dispatch(createPost(picture_url, caption))
        setShowModal(false);
    }

    return (
        <>
            <form action="#" id="#" className='postmodal-form' onSubmit={handleSubmit}>
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
                    {/* <label >
                        <input
                        className="image-input"
                        placeholder='img address...'
                        type="text"
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        required
                    /> */}
                        <input
                            type="file"
                            onChange={onInputChange}
                            className="form-control"
                            multiple="" />

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
