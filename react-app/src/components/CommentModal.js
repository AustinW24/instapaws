import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteComment } from "../store/comments"
import './CommentModal.css'


export default function CommentModal({ commentId, setShowCommentModal, setClicked }) {
    const dispatch = useDispatch();

    const handleDelete = async (e) => {
        await dispatch(deleteComment(commentId))
        setShowCommentModal(false);
    }

    const handleModal = () => {
        setShowCommentModal(false)
        setClicked(false)
    }

    return (
        <>
            <form className="deletemodal-form" type="form" onSubmit={handleDelete}>
                <div className="delete-comment">
                     <button type="submit" className='delete' onClick={handleDelete}> Delete</button>
                     < hr/>
                    <div className="comment-cancel">
                        <button className='cancel' onClick={handleModal}>Cancel</button>
                </div>
                    </div>
            </form>
        </>
    )
}
