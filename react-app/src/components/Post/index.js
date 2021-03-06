import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import { getPost, likePost, getAllPosts } from '../../store/posts'
import { createComment } from '../../store/comments'
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import CommentModal from '../CommentModal.js'
import EditModal from '../EditModal.js'
import DeleteModal from '../DeleteModal.js'
import Modal from '../../context/Modal'
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
    const [heartColor, setHeartColor] = useState(('transparent'));
    const [heartId, setHeartId] = useState(0);
    const [postsId, setPostsId] = useState(0);
    const dispatch = useDispatch();
    const [postObj, setPostObj] = useState(null);



    useEffect(() => {
        if (post) {
            const newPost = post[id];
            setPostObj(newPost);
        }
    }, [post, id, postsId, comments]);


    useEffect(() => {
        dispatch(getPost(id))
    }, [dispatch, heartColor, comments, showDeleteModal])

    useEffect(() => {
        if(!comments.length) {
            dispatch(getPost(id))
        } else {
            dispatch(getPost(id))
        }
    }, [dispatch, comments])



    const handleNewSubmit = async e => {
        e.preventDefault()

        let payload = {
            comments,
            post_id: Number.parseInt(postObj?.id),
            user_id: user.id,
        }
        setComments("")
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


    const postLikes = async (post) => {
        await dispatch(likePost(postObj))
        setHeartId(post.id)
        if (heartColor === 'transparent') {
            setHeartColor('red')
        } else {
            setHeartColor('transparent')
        }
    }

    const handleClicked = () => {
        if (clicked) {
            setClicked(!clicked)
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

    const handleMouseEnter = (comm) => {
        setRemoveDiv({ display: 'block' })
        setCommentId(comm?.id)
    }



    return (
        <div className="body" onClick={handleClicked}>
            <div className="container">
                <div className="post-container">
                    {postObj && <div className="postid-pic" style={{ backgroundImage: `url(${postObj?.picture_url})` }}></div>}
                </div>
                <div className="comments-container">
                    <div className="comments-header">
                        {postObj && <img className="post-profile-pic" src={postObj?.user.profile_picture} alt="cool person"></img>}
                        <div className="post-username"> <a href={`/users/${postObj?.user_id}`}>{postObj?.user.username}</a></div>
                        {postObj?.user_id === user.id &&
                            <button className='post-dropdown' onClick={() => show(post)}><BiDotsHorizontalRounded /></button>
                        }
                        {clicked &&
                            <div className="post-dot-dropdown">
                                <a className="edit-button" onClick={() => setShowEditModal(true)}>edit</a>
                                <a className="post-delete-button" style={{ "color": "red" }} onClick={() => setShowDeleteModal(true)}>delete</a>
                            </div>
                        }

                        {showEditModal && (
                            <Modal onClose={() => setShowEditModal(false)}>
                                <EditModal post={postObj} setShowEditModal={setShowEditModal} setClicked={setClicked} />
                            </Modal>
                        )}
                        {showDeleteModal && (
                            <Modal onClose={() => setShowDeleteModal(false)}>
                                <DeleteModal post={postObj} setShowDeleteModal={setShowDeleteModal} user={user} setClicked={setClicked} />
                            </Modal>
                        )}
                    </div>

                    <div className="user-caption"><img className="bottom-profile-pic" src={postObj?.user.profile_picture} alt="cool person"></img>

                        <p ><span  className="caption-span" style={{"fontWeight": "bold"}} ><a style={{"marginLeft": "12px"}} href={`/users/${postObj?.user_id}`} >{postObj?.user.username}{"      "}</a></span>{"      "}{postObj?.caption}</p>
                    </div>
                    <div className="comment-scroll">
                        <div>{postObj?.post_comments.map((comm, idx) =>
                            <div className='indv-comment' key={comm?.id}>
                                <ul className="comments-list">
                                    <li className="comment-row2">
                                        <img className="post-profile-av" src={comm?.user_pic} alt="avatar"></img>
                                        {user.username !== comm?.user &&
                                            <div className="post-comment">
                                                <strong> <a href={`/users/${comm?.user_id}`}  className="post-username">{comm?.user}</a></strong>
                                                <span className="post-comm">{comm?.comment}</span>
                                            </div>
                                        }
                                        {user.username === comm?.user &&
                                            <div className="post-user-comment">
                                                <span  className="post-comment">
                                                    <strong> <a href={`/users/${user?.id}`}  className="post-username">{comm?.user}</a></strong>
                                                    <span className="post-comm" onMouseEnter={() => { handleMouseEnter(comm) }}>{comm?.comment}</span>
                                                </span>

                                                <button onMouseEnter={() => { handleMouseEnter(comm) }} onMouseLeave={e => { setRemoveDiv({ display: 'none' }) }}
                                                    className="comment-dot" style={removeDiv} onClick={(e) => {
                                                        handleCommentClick(comm)
                                                    }}>
                                                        {commentId === comm?.id &&
                                                    <BiDotsHorizontalRounded />
                                                        }
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
                        <div className="icon-bar">
                            <button onClick={() => postLikes(postObj)} className="post-heart-btn" style={{ 'backgroundColor': 'transparent', width: '20px', 'marginLeft': '8px', 'border': 'none', 'padding': '0px' }}>
                                {postObj?.postLikes.includes(user.id) ? (
                                    <FontAwesomeIcon style={{ 'color': 'red' }} className="post-heart" icon={faHeart}>
                                    </FontAwesomeIcon>
                                ) : (
                                    <FontAwesomeIcon style={{ 'color': 'transparent' }} className="post-heart" icon={faHeart}>
                                    </FontAwesomeIcon>
                                )}
                            </button>
                            <div className="post-likes-span">
                                {postObj?.postLikes.length !== 0 ? (
                                    <span>{postObj?.postLikes.length} liked</span>
                                ) : (
                                    ""
                                )
                                }
                            </div>
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
