import React, { useState } from "react"
// import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux"
import { createPost } from "../store/posts"
import './PostModal.css'
import './FileUploader/FileUploader.css'


function PostModal({ setShowModal }) {
    const dispatch = useDispatch();
	// const history = useHistory();
    const [caption, setCaption] = useState('');
    const [picture_url, setPictureUrl] = useState(""); //IMAGE FILE
    const [errors, setErrors] = useState([]);
	// const [imgFile, setImgFile] = useState("")
	// const [disabledSubmitButton, setDisabledSubmitButton] = useState(false);
	// const imageFileEndings = ["png", "jpg", "jpeg"];
    // const [imgFile, setImgFile] = useState("")

    const onSubmit = async (e) => {
        await dispatch(createPost(picture_url, caption))
        // let postData = new FormData()
        // postData.set("file", picture_url)
        // postData.set("caption", caption)

        // if(picture_url){
        //     const imageNameSplit = picture_url.split(".");
        //     const imageExt = imageNameSplit[imageNameSplit.length-1];
        //     if(imageFileEndings.includes(imageExt)){
		// 			setDisabledSubmitButton(true);
        //             const response = await dispatch(createPost(picture_url, caption))
        //         	if (response.errors) {
        //                 setErrors(response.errors);
        //                 setDisabledSubmitButton(false);
        //             } else {
        //                 history.push(`/`);
        //             }
        //         } else {
        //             setErrors([
        //                 "Something went wrong uploading your content!",
        //             ]);
        //         }
        // }

        setShowModal(false);
    }

    return (
        <>

            <form  className='postmodal-form' onSubmit={onSubmit} >
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
                        className="caption-input"
                        onChange={(e) => setCaption(e.target.value)}
                        required
                    />

                    <input
                        type="text"
                        // accept=".png,.jpg,.jpeg"
                        placeholder="image url..."
                        name='picture_url'
                        className="image-input"
                        onChange={(e) => setPictureUrl(e.target.value)}

                    />

                    <div className="post-buttons">
                        <button style={{ width: "50%" }} type="submit" className='post-confirm'  value="Upload">{'   '}Create</button>
                        <button style={{ width: "50%" }} className="post-cancel" onClick={() => setShowModal(false)}>Cancel</button>
                    </div>
                </div>
            </form>
        </>
    )

}


export default PostModal
