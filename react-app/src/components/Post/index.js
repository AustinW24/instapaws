import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import { getPost } from '../../store/posts'
import { getComments, deleteComment, createComment } from '../../store/comments'
import { getAllUsers } from '../../store/users'
import CommentModal from '../CommentModal.js'
import EditModal from '../EditModal.js'
import DeleteModal from '../DeleteModal.js'
import Modal from '../../context/Modal'
import { BiDotsHorizontalRounded } from "react-icons/bi";
import './Post.css'



function Post() {
    const { id } = useParams()
    const post = useSelector((state) => state.posts);
    const user = useSelector(state => state.session.user);

    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showCommentModal, setShowCommentModal] = useState(false);
    const [comments, setComments] = useState('');
    const [postUserId, setPostUserId] = useState(0);
    const [commentId, setCommentId] = useState(0);
    const [clicked, setClicked] = useState(false);
    const [removeDiv, setRemoveDiv] = useState({ display: 'none' });


    const [postsId, setPostsId] = useState(0);
    const dispatch = useDispatch();
    const [postObj, setPostObj] = useState(null);

    useEffect(() => {
        if (post) {
            const newPost = post[id];
            setPostObj(newPost);
        }
    }, [post, id]);




    useEffect(() => {
        dispatch(getAllUsers())
    }, [dispatch])

    useEffect(() => {
        dispatch(getPost(id))
    }, [dispatch, comments])



    const handleNewSubmit = async e => {
        e.preventDefault()

        let payload = {
            comments,
            post_id: Number.parseInt(postObj?.id),
            user_id: user.id,
        }
        setComments('')
        await dispatch(createComment(payload))
    }

    const show = (post) => {
        setPostsId(postObj?.id);
        setClicked(!clicked)
    }

    const postDetails = (pId, uId) => {
        setPostsId(pId)
        setPostUserId(uId)
    }

    const handleClicked = () => {
        if (clicked) {
            setClicked(false)
        }
    }

    const handleCommentClick = (comment) => {
        setCommentId(comment.id);
        if (showCommentModal === false) {
            setShowCommentModal(true)
        } else {
            setShowCommentModal(false)
        }
    }

    const handleMouseEnter = (e) => {
        setRemoveDiv({ display: 'block' })
        setCommentId(e.target.id)
    }


    return (
        <div className="body" onClick={handleClicked}>
            <div className="container">
                <div className="post-container">
                    {postObj && <div className="postid-pic" style={{ backgroundImage: `url(${postObj?.picture_url})` }}></div>}
                </div>
                <div className="comments-container">
                    <div className="comments-header">
                        {postObj && <img className="post-profile-pic" src={postObj?.user.profile_picture}></img>}
                        <div className="post-username">{postObj?.user.username}</div>
                        {postObj?.user_id == user.id &&
                            <button className='post-dropdown' onClick={() => show(post)}><BiDotsHorizontalRounded /></button>
                        }
                        {clicked &&

                            <div className="dot-dropdown">
                                <a className="edit-button" onClick={() => setShowEditModal(true)}>edit</a>
                                {showEditModal && (
                                    <Modal onClose={() => setShowEditModal(false)}>
                                        <EditModal post={postObj} setShowEditModal={setShowEditModal} setClicked={setClicked} />
                                    </Modal>
                                )}
                                <a className="delete-button" style={{ "color": "red" }} onClick={() => setShowDeleteModal(true)}>delete</a>
                                {showDeleteModal && (
                                    <Modal onClose={() => setShowDeleteModal(false)}>
                                        <DeleteModal post={postObj} setShowDeleteModal={setShowDeleteModal} setClicked={setClicked} />
                                    </Modal>
                                )}
                            </div>
                        }
                    </div>

                    <div className="user-caption"><img className="bottom-profile-pic" src={postObj?.user.profile_picture}></img><span className="caption-span">{postObj?.caption}</span>
                    </div>
                    <div className="comment-scroll">
                        <div>{postObj?.post_comments.map((comm, id) =>
                            <div className='indv-comment' key={comm?.id}>
                                <ul className="comments-list">
                                    <li className="comment-row2">
                                        <img className="post-profile-av" src={comm?.user_pic}></img>
                                        {user.username !== comm?.user &&
                                            <div className="post-comment">
                                                <strong className="post-username">{comm?.user}</strong>
                                                <span>{comm?.comment}</span>
                                            </div>
                                        }
                                        {user.username === comm?.user &&
                                            <div className="post-user-comment">
                                                <span onMouseEnter={e => { handleMouseEnter(e) }}
                                                    onMouseLeave={e => { setRemoveDiv({ display: 'none' }) }} className="post-comment">
                                                    <strong className="post-username">{comm?.user} </strong>
                                                    <span className="post-comm">{comm?.comment}</span>
                                                </span>

                                                <button onMouseEnter={e => { handleMouseEnter(e) }} onMouseLeave={e => { setRemoveDiv({ display: 'none' }) }}
                                                    className="comment-dot" style={removeDiv} onClick={(e) => {
                                                        handleCommentClick(comm)
                                                    }}>
                                                        <BiDotsHorizontalRounded />
                                                </button>
                                                {showCommentModal && (
                                                    <Modal onClose={() => setShowCommentModal(false)}>
                                                        <CommentModal commentId={commentId} setShowCommentModal={setShowCommentModal} setClicked={setClicked} />
                                                    </Modal>
                                                )}
                                            </div>
                                        }
                                    </li>
                                </ul>
                            </div>)}
                        </div>

                        <form className='comment-form' onSubmit={handleNewSubmit}>
                            <textarea className="text-box" placeholder="Add a comment..." value={comments} onChange={e => setComments(e.target.value)}></textarea>
                            <button className="post-button" onClick={() => postDetails(postObj?.id, postObj?.user.id)} type="submit">Post</button>
                        </form>
                    </div>
                </div>
            </div >
        </div>


    )
}


export default Post
