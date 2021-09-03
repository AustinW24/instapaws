
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getAllPosts, editPost } from '../../store/posts';
import { createComment, getComments } from '../../store/comments';
import { getAllUsers } from '../../store/users'
import EditModal from '../EditModal.js'
import DeleteModal from '../DeleteModal.js'
import Modal from '../../context/Modal'
import { BiDotsHorizontalRounded } from "react-icons/bi";
import './HomePage.css'

export default function HomePage() {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts?.posts);
    const user = useSelector(state => state.session.user);
    const comment = useSelector(state => state.comments);
    const allUsers = useSelector(state => state.users)
    const [clicked, setClicked] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [comments, setComments] = useState('')
    const [postsId, setPostsId] = useState(0);
    const [postUserId, setPostUserId] = useState(0)

     useEffect(() => {
         if(postsId) {
        dispatch(getComments(postsId))
         }
    }, [dispatch])

    useEffect(() => {
        if (!posts) {
            dispatch(getAllUsers())
            dispatch((getAllPosts()))
        }
        }, [dispatch])
    console.log(allUsers)

    const handleNewSubmit = async e => {
        e.preventDefault()

        let payload = {
            comments,
            post_id: Number.parseInt(postsId),
            user_id: postUserId,
    }
        console.log(postsId)
        await dispatch(createComment(payload))
  }

    const postDetails = (pId, uId) => {
        setPostsId(pId)
        setPostUserId(uId)
    }


    const show = (post) => {
        setPostsId(post.id);
        setClicked(!clicked)
    }




    return (
        <>
            <div className='home-container'>
                <ul className='post-list'>
                    {posts?.slice(0).reverse().map((post, idx) => {
                        console.log(post)
                        return (
                            <li key={idx} className="indv-post">

                                <div className="post-header">

                                     <img className="profile-pic" src={post?.user.profile_picture}></img>
                                    <a href={`users/${post?.user.id}`} className="homepage-username">{post?.user.username}{" "}</a>

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
                                <div className="post-footer">
                                        <img className="bottom-profile-pic" src={post.user.profile_picture}></img>
                                        <a to={`/${post.user.id}`} className="bottom-homepage-username">{post.user.username}</a>
                                        <span className="post-caption">{post.caption}</span>
                                        <div className="homepage-comments">
                                         <div>{post?.post_comments.map((comm, idx) => <div className={'indv-comment'} key={idx}>
                                                    <img className="post-profile-pic" src={comm?.user_pic}></img>
                                                    <div>{comm?.comment}</div>
                                         </div>)}
                                     </div>
                                    </div>
                                    <div className="footer-comment">
                                        <form className='comment-form' onSubmit={handleNewSubmit}>
                                                <textarea  className="text-box" placeholder="Add a comment..." value={comments} onChange={e => setComments(e.target.value)}></textarea>
                                                <button  onClick={() => postDetails(post?.id, post?.user.id)} className="postt-button" type="submit">Post</button>
                                         </form>
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </>
    )

}
