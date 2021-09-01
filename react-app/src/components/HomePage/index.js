
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
    const allUsers = useSelector(state => state.users)
    const [clicked, setClicked] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [postObj, setPostObj] = useState(null);
    const [postsId, setPostsId] = useState(0);
    const dispatch = useDispatch();



    useEffect(() => {
        dispatch(getAllPosts())
    }, [dispatch])

    useEffect(() => {
        dispatch(getAllUsers())
    }, [dispatch])


    const show = (post) => {
        setPostsId(post.id);
        setClicked(!clicked)
    }

    console.log(posts)

    // useEffect(() => {
    //     if(allUsers) {
    //         const postImg = allUsers
    //         console.log("post object", postImg)
    //         setPostObj(postImg)
    //     }
    // }, [allUsers, posts])

    // useEffect(() => {
    //     if (post) {
    //        const newPost = post[id];
    //        console.log('post object', newPost);

    //        setPostObj(newPost);
    //     }
    //  }, [post, id]);
    // console.log(posts)
    // console.log(allUsers[1].username)
    // console.log("allUsers Object", allUsers[user.id].username)


    return (
        <>
            <div className='home-container'>
                <ul className='post-list'>
                    {posts.slice(0).reverse().map((post, idx) => {
                        return (
                            <li key={idx} className="indv-post">

                                <div className="post-header">
                                    <img className="profile-pic" src={allUsers[post.user_id].profile_picture}></img>
                                    <a to={`/${allUsers[post.user_id]}`} className="homepage-username">{allUsers[post.user_id].username}</a>

                                    {post.user_id === user.id &&
                                        <button className='post-dropdown' onClick={() => show(post)}><BiDotsHorizontalRounded /></button>

                                    }
                                    {clicked && postsId === post.id &&

                                        <div className="dot-dropdown">
                                            <a className="edit-button" onClick={() => setShowEditModal(true)}>edit</a>
                                            {showEditModal && (
                                                <Modal onClose={() => setShowEditModal(false)}>
                                                    <EditModal post={post} setShowEditModal={setShowEditModal} />
                                                </Modal>
                                            )}
                                            <a className="delete-button" onClick={() => setShowDeleteModal(true)}>delete</a>
                                            {showDeleteModal && (
                                                <Modal onClose={() => setShowDeleteModal(false)}>
                                                    <DeleteModal post={post} setShowDeleteModal={setShowDeleteModal} />
                                                </Modal>
                                            )}
                                        </div>
                                    }

                                </div>
                                <img alt="users post" src={post.picture_url} className="indv-photo"></img>
                                <img className="bottom-profile-pic" src={allUsers[post.user_id].profile_picture}></img>
                                <a to={`/${allUsers[post.user_id]}`} className="bottom-homepage-username">{allUsers[post.user_id].username}</a>
                                {post.caption}
                            </li>
                        )
                    })}
                </ul>

            </div>

        </>
    )

}
