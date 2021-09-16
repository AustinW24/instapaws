import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createComment, getComments } from '../store/comments';
import "./Comment.css"



function Comment({id, comment}) {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.session.user)
    const [comment, setComment] = useState('')
    const [editId, setEditId] = useState(false)


    useEffect(() => {
    dispatch(getComments(id))
    }, [id, dispatch, editComment])


      const handleNewSubmit = async e => {
    e.preventDefault()

    let payload = {
      comment,
      user_id: user.id,
      post_id: Number.parseInt(id),
    }
    setComment('')
    await dispatch(createComment(payload))
  }



    return (
        <section>
            <form className='comment-form'>

            </form>
        </section>
    )
}
