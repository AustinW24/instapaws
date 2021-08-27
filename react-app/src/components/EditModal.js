import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { creatPost } from "../store/posts"
import Modal from '../context/Modal'


function EditModal({ post, setShowModal }) {
    const dispatch = useDispatch();
    const [caption, setCaption] = useState('');


    return(
        <>
        <form className="editmodal-form">
            <div>
                
            </div>
        </form>
        </>
    )
}
