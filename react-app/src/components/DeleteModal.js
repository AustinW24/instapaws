import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { removePost } from "../store/posts"
import './DeleteModal.css'


export default function DeleteModal({ post, setShowDeleteModal, setClicked }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user)
    const [userId, setUserId] = useState({})
    const [update, setUpdate] = useState({})
    let url = window.location.href.slice(0, 28)
    let id = user.id;


    useEffect(() => {
        if (!userId) {
            return;
        }
        (async () => {
            const response = await fetch(`/api/users/${id}`);
            const user = await response.json();
            setUserId(user);
        })();
        setUpdate(false)

    }, [user, id])

    const exitModal = () => {
        setShowDeleteModal(false)
        setClicked(false)
    }
    const handleClick = () => {
        if(url.includes("post")){
            history.push(`/users/${id}`)
            window.location.reload(true);
        }
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        await dispatch(removePost(post.id))
        if(url.includes("post")){
            handleClick();
        } else {
            window.location.reload(true);

        }
        // setShowDeleteModal(false);
    }





    return (
        <>
            <form className="deletemodal-form" type="form" onSubmit={handleDelete}>
                <div className="delete-content">
                    <button type="submit" className='delete-button' >Delete</button>
                    <hr className="hr-delete" style={{ 'width': '215px', 'opacity': '0.4' }} />
                        <button className="cancel-button" onClick={exitModal}>Cancel</button>
                </div>
            </form>
        </>
    )
}
