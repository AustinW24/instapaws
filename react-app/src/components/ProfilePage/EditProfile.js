import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { update } from '../../store/session'
import './EditProfile.css'
import uploadlogo from "../../upload.png"


function EditProfileModal({setShowProfileModal, currentUser}) {
    const history = useHistory();
    const dispatch = useDispatch();
    const [biography, setBiography] = useState('');
    const [profile_picture, setProfilePic] = useState('');
    const [errors, setErrors] = useState([]);
    const user_id = currentUser.id

    const handleSubmit = async (e) => {

       const data =  await dispatch(update(user_id, profile_picture, biography))

       if(data ) {
           setErrors(data)
       }
       console.log(data)
        // history.push(`/users/${+id}`)
        setShowProfileModal(false);
    }

    const handleEmptyInput = () => {
        if(profile_picture.length < 10) {
            setProfilePic(currentUser.profile_picture)
        } else if (biography.length < 1) {
            setBiography(currentUser.biography)
        }

    }


    return (
        <>
            <form className='profile-modal' onSubmit={handleSubmit}>
                <div className="post-errors">
                    {errors.map(error => (
                        <li>{error}</li>
                    ))}
                </div>
                <div className='post-image'>
                    <img  className="upload-logo" src={uploadlogo}></img>
                <label className="profilephoto-label" >Profile Photo</label>
                    <input
                        placeholder='Profile Photo'
                        type="text"
                        value={profile_picture}
                        className="profilepic-input"
                        onChange={(e) => setProfilePic(e.target.value)}
                        required
                    />

                <label className="bio-label" >Bio</label>
                    <input
                        placeholder='Bio'
                        type="text"
                        value={biography}
                        onChange={(e) => setBiography(e.target.value)}
                        required
                        />

                        </div>
                <div className="post-buttons">
                    {profile_picture.value < 10 ? setProfilePic(currentUser.profile_picture) : null}
                    <button onClick={handleEmptyInput} type="submit" className='submit' >{'   '}Submit</button>
                    <button onClick={() => setShowProfileModal(false)}>Cancel</button>
                </div>
            </form>
        </>
    )

}


export default EditProfileModal
