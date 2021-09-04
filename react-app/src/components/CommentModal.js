import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteComment } from "../store/comments"
// import './CommentModal.css'


export default function CommentModal({ comm, setShowCommentModal }) {
    const dispatch = useDispatch();


    const handleDelete = async (e) => {
        await dispatch(deleteComment(comm.id))
        setShowCommentModal(false);
    }
    return (
        <>
            <form className="deletemodal-form" type="form">
                <div className="delete-comment">
                     <button type="submit" className='delete'  onClick={handleDelete}> delete</button>
                    <div className="comment-cancel">
                        <button onClick={() => setShowCommentModal(false)}>cancel</button>
                    </div>
                </div>
            </form>
        </>
    )
}
