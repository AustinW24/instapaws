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
                    <img  className="users-profile-photo" src={currentUser.profile_picture}></img>
                    <input
                        placeholder='Profile Photo'
                        type="text"
                        value={profile_picture}
                        className="profilepic-input"
                        onChange={(e) => setProfilePic(e.target.value)}
                        required
                    />


                    <textarea
                        placeholder='Bio'
                        type="text"
                        value={biography}
                        onChange={(e) => setBiography(e.target.value)}
                        required
                        className="bio-input"
                        />

                        </div>
                <div className="editprofile-buttons" style={{display: 'flex', gap: '10px'}}>
                    {profile_picture.value < 10 ? setProfilePic(currentUser.profile_picture) : null}
                    <button onClick={handleEmptyInput} type="submit" className='edit-submit' style={{backgroundColor: '#fff', 'border': '1px solid black', 'border-radius': '0.2rem', 'padding': '2px'}}>{'   '}Submit</button>
                    <button onClick={() => setShowProfileModal(false)} className='edit-cancel' style={{backgroundColor: '#fff', 'border': '1px solid black', 'border-radius': '0.2rem', 'padding': '2px'}}>Cancel</button>
                </div>
            </form>
        </>
    )

}


export default EditProfileModal
