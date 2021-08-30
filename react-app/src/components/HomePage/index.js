
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react"
import { getAllPosts, editPost } from '../../store/posts'
import { getAllUsers } from '../../store/users'
import EditModal from '../EditModal.js'
import DeleteModal from '../DeleteModal.js'
import Modal from '../../context/Modal'
import { BiDotsHorizontalRounded } from "react-icons/bi";
import './HomePage.css'

export default function HomePage() {
    const posts = useSelector((state) => Object.values(state.posts));
    const user = useSelector(state => state.session.user);
    const allUsers = useSelector(state => Object.values(state.users))
    const [clicked, setClicked] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
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
                <ul className='post-list'>
                    {posts.slice(0).reverse().map((post, idx) => {
                        return (
                            <li key={idx} className="indv-post">
                                <div className="post-header">
                                    
                                    {post.user_id === user.id &&
                                        <button className='post-dropdown' onClick={() => setClicked(!clicked)}><BiDotsHorizontalRounded /></button>
                                    }
                                    {(clicked && post.user_id === user.id ) &&

                                        <div className="dot-dropdown">
                                        <a className="edit-button"  onClick={() => setShowEditModal(true)}>edit</a>
                                        {showEditModal && (
                                            <Modal onClose={() => setShowEditModal(false)}>
                                            <EditModal post={post} setShowEditModal={setShowEditModal} />
                                            </Modal>
                                            )}
                                                <a className="delete-button"  onClick={() => setShowDeleteModal(true)}>delete</a>
                                                {showDeleteModal && (
                                                    <Modal onClose={() => setShowDeleteModal(false)}>
                                                    <DeleteModal post={post} setShowDeleteModal={setShowDeleteModal} />
                                                    </Modal>
                                                    )}
                                            </div>
                                        }

                                </div>
                                <img alt="users post" src={post.picture_url} className="indv-photo"></img>
                                <strong className="homepage-username">{user.username}</strong>
                                {post.caption}
                            </li>
                        )
                    })}
                </ul>

            </div>

        </>
    )

}
