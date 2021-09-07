import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteComment } from "../store/comments"
import './CommentModal.css'


export default function CommentModal({ comm, setShowCommentModal, setClicked }) {
    const dispatch = useDispatch();


    const handleDelete = async (e) => {
        console.log("COMM IDD", comm.id)
        await dispatch(deleteComment(comm.id))

        setShowCommentModal(false);
    }

    const handleModal = () => {
        setShowCommentModal(false)
        setClicked(false)
    }


    return (
        <>
            <form className="deletemodal-form" type="form">
                <div className="delete-comment">
                     <button type="submit" className='delete'  onClick={handleDelete}> Delete</button>
                     < hr/>
                    <div className="comment-cancel">
                        <button className='cancel' onClick={handleModal}>Cancel</button>
                </div>
                    </div>
            </form>
        </>
    )
}