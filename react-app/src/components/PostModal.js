import React, { useState } from "react"
import { useDispatch} from "react-redux"

import { createPost } from "../store/posts"
import './PostModal.css'




function PostModal({ setShowModal }) {
    const dispatch = useDispatch();
    // const history = useHistory();
    const [caption, setCaption] = useState('');
    const [url, setUrl] = useState("");
    const [errors, setErrors] = useState([]);
    const [image, setImage] = useState('');



    const updateImage = (e) => {
        const file = e.target.files[0];

        if (!file) {
            setUrl(url);
            setImage(image);

        } else {
            const ext = file.type.split('/')
            const extensions = "pdf, png, jpg, jpeg, gif"
            if (extensions.includes(ext[1])) {
                setUrl(URL.createObjectURL(file))
                setImage(file);
            } else {
                setErrors({ filetype: 'Filetype not supported, please upload a pdf, png, jpg, jpeg, or gif file.' })
            }
        }
    }

    const postCreate = async (e) => {
        e.preventDefault();
        let image_url = url;

        if (url !== 'https://i.imgur.com/BPOYKBx.png') {
            let formData = new FormData()
            formData.append('image', image)

            let res = await fetch('/api/images/', {
                method: "POST",
                body: formData,
            });
            let x = await res.json()
            image_url = x['url']

            await dispatch(createPost(image_url, caption))
            setShowModal(false)
        }

        // window.location.reload(true);
    }


    return (
        <>

            <form action="#" id="#" className='postmodal-form' >
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
                        // placeholder='img address...'
                        type="file"
                        accept="image/png, image/gif, image/jpeg, image/pdf, image/jpg"
                        onChange={updateImage}

                    />


                    <div className="post-buttons">
                        <button style={{ width: "50%" }} type="submit" className='post-confirm'  onClick={postCreate}>{'   '}Create</button>
                        <button style={{ width: "50%" }} className="post-cancel" onClick={() => setShowModal(false)}>Cancel</button>
                    </div>
                </div>
            </form>
        </>
    )

}


export default PostModal
