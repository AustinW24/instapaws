import { useParams, Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react"
import { getAllPosts, editPost } from '../../store/posts'
import { getAllUsers } from '../../store/users'
import EditModal from '../EditModal.js'
import Modal from '../../context/Modal'
import { BiDotsHorizontalRounded } from "react-icons/bi";
import './HomePage.css'

export default function HomePage() {
    const posts = useSelector((state) => Object.values(state.posts));
    const user = useSelector(state => state.session.user);
    const allUsers = useSelector(state => Object.values(state.users))
    const [clicked, setClicked] = useState(false)
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();



    useEffect(() => {
        dispatch(getAllPosts())
    }, [dispatch])

    useEffect(() => {
        dispatch(getAllUsers())
    }, [dispatch])



    return (
        <>
            <div className='home-container'>
                <h1>Home feed</h1>
                <ul className='post-list'>
                    {posts.map((post, idx) => {
                        return (
                            <li key={idx} className="indv-post">
                                <div className="post-header">{post.user_id}
                                    {post.user_id === user.id ?
                                        <button className='post-dropdown' onClick={() => setClicked(!clicked)}><BiDotsHorizontalRounded /></button> : null
                                    }
                                    {clicked &&
                                        <>
                                            <div>
                                                <a className="edit-button" onClick={() => setShowModal(true)}>edit</a>
                                                {showModal && (
                                                    <Modal onClose={() => setShowModal(false)}>
                                                        <EditModal post={post} setShowModal={setShowModal} />
                                                    </Modal>
                                                )}
                                                <a className="delete-button">delete</a>
                                            </div>
                                        </>}

                                </div>
                                <img alt="users post" src={post.picture_url} className="indv-photo"></img>
                                {post.caption}
                            </li>
                        )
                    })}
                </ul>

            </div>

        </>
    )

}
