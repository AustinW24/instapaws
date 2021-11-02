
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom"
import { getAllPosts, likePost } from '../../store/posts';
import { createComment, getComments } from '../../store/comments';
import EditModal from '../EditModal.js';
import DeleteModal from '../DeleteModal.js';
import CommentModal from '../CommentModal.js';
import Modal from '../../context/Modal';
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OutsideClickHandler from 'react-outside-click-handler'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import './HomePage.css';


export default function HomePage() {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts?.posts);
    const user = useSelector(state => state.session.user);
    const [clicked, setClicked] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showCommentModal, setShowCommentModal] = useState(false);
    const [comments, setComments] = useState('');
    const [commentId, setCommentId] = useState(0);
    const [postsId, setPostsId] = useState(0);
    const [postUserId, setPostUserId] = useState(0);
    const [removeDiv, setRemoveDiv] = useState({ display: 'none' });
    const [heartColor, setHeartColor] = useState(('transparent'));
    const [heartId, setHeartId] = useState(0);
    const [body, setBody] = useState({})


    useEffect(() => {
        if (!comments)
            dispatch(getAllPosts())
    }, [dispatch, comments])

    useEffect(() => {
        if (!posts) {
            dispatch(getAllPosts())
        } else {
            dispatch(getAllPosts())
        }
    }, [dispatch, heartColor])


    const handleNewSubmit = async e => {
        e.preventDefault();
        let payload = {
            comments,
            post_id: Number.parseInt(postsId),
            user_id: user.id,
        }
        setComments('')
        await dispatch(createComment(payload))
    }
    const bodyScroll = () => {
        document.body.style.overflow = 'hidden'
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
        setCommentId(comm?.id)
        setRemoveDiv({ display: 'block' })
    }


    const postDetails = (pId, uId) => {
        setPostsId(pId)
        setPostUserId(uId)
    }

    const show = (post) => {
        setPostsId(post.id);
        setClicked(!clicked)
    }


    const postLikes = async (post) => {
        await dispatch(likePost(post))
        setHeartId(post.id)
        if (heartColor === 'transparent') {
            setHeartColor('red')
        } else {
            setHeartColor('transparent')
        }
    }

    const handleEditModal = (post) => {
        bodyScroll()
        setPostsId(post.id);
        setShowEditModal(true)
    }

    const handleModal = (post, e) => {

        setPostsId(post.id);
        setClicked(false);
        setShowDeleteModal(false);
        setShowEditModal(false)
    }



    return (
        <>
            <div className='home-container' style={{ height: showEditModal || showDeleteModal ? "100vh" : null, "overflowY": showEditModal || showDeleteModal ? "hidden" : null }}>
                <ul value={body} className='post-list' >
                    {posts?.slice(0).reverse().map((post, idx) => {

                        return (
                            <li key={idx} className="indv-post">

                                <div className="post-header">

                                    <img className="profile-pic" src={post?.user.profile_picture} alt="user"></img>
                                    <a href={`users/${post?.user.id}`} className="homepage-username">{post?.user.username}{" "}</a>
                                    {post.user_id === user.id &&
                                        <button className='post-dropdown' onClick={() => show(post)}><BiDotsHorizontalRounded /></button>
                                    }
                                    {clicked && postsId === post.id &&
                                        <div className="dot-dropdown">
                                            <a className="dot-edit-button" onClick={(e) => setShowEditModal(true)}>Edit</a>
                                            <a className="dot-delete-button" onClick={(e) => setShowDeleteModal(true)}>Delete</a>
                                        </div>
                                    }

                                    {clicked && postsId === post.id && showEditModal && (
                                        <OutsideClickHandler onOutsideClick={() => {
                                            handleModal(post)
                                        }}>

                                            <Modal onClose={() => setShowEditModal(false)}>
                                                <EditModal post={post} setShowEditModal={setShowEditModal} setClicked={setClicked} />
                                            </Modal>
                                        </OutsideClickHandler>
                                    )
                                    }
                                    {clicked && postsId === post.id && showDeleteModal && (
                                        <OutsideClickHandler onOutsideClick={() => {
                                            handleModal(post)
                                        }}>
                                            <Modal onClose={() => setShowDeleteModal(false)}>
                                                <DeleteModal post={post} setShowDeleteModal={setShowDeleteModal} setClicked={setClicked} />
                                            </Modal>
                                        </OutsideClickHandler>

                                    )
                                    }



                                </div>
                                <div className="photo-container"><div className="indv-photo" style={{ backgroundImage: `url(${post.picture_url})` }}></div></div>


                                <div className="post-footer" >
                                    <div className="post-footer-head">
                                        <button onClick={() => postLikes(post)} className="homepage-heart-btn" style={{ 'backgroundColor': 'transparent', width: '20px', 'marginLeft': '14px', 'border': 'none', 'padding': '0px' }}>
                                            {post?.postLikes.includes(user.id) ? (
                                                <FontAwesomeIcon style={{ 'color': 'red' }} className="homepage-heart" icon={faHeart}>
                                                </FontAwesomeIcon>
                                            ) : (
                                                <FontAwesomeIcon style={{ 'color': 'transparent' }} className="homepage-heart" icon={faHeart}>
                                                </FontAwesomeIcon>
                                            )}
                                        </button>
                                        <div className="home-likes-span">
                                            {post?.postLikes.length !== 0 ? (
                                                <span style={{ "fontWeight": "bold" }}>{post?.postLikes.length} liked</span>
                                            ) : (
                                                ""
                                            )
                                            }
                                        </div>
                                        <div>
                                            <a href={`/users/${post.user.id}`} className="bottom-homepage-username">{post.user.username}</a>
                                            <span className="post-caption">{post.caption}</span>
                                        </div>

                                    </div>
                                    <div className="homepage-comments">
                                        {post?.post_comments.length < 2 &&
                                            <div className="comment-row">{post?.post_comments.map((comm, idx) => <div className='home-indv-comment' key={idx}>
                                                <div className="home-pic-comment" style={{ "marginTop": "5px" }}>
                                                    <img className="home-profile-pic" src={comm?.user_pic} alt="cool person"></img>
                                                </div>
                                                <div className="home-user-comment">
                                                    <a href={`/users/${comm?.user_id}`} className="span-username">{comm.user}</a></div>
                                                {user &&
                                                    <div style={{ "paddingRight": '3px' }}
                                                        onMouseEnter={e => {
                                                            setRemoveDiv({ display: 'block', top: 0 });
                                                            setCommentId(comm.id)
                                                        }}
                                                        onMouseLeave={e => {
                                                            setRemoveDiv({ display: 'none' })
                                                        }} className="comment-row"
                                                    >
                                                        {comm?.comment}
                                                        {commentId === comm.id && user.id === comm?.user_id &&
                                                            <button className="comment-dot" onClick={() => handleCommentClick(comm)} style={removeDiv} onMouseEnter={() => { handleMouseEnter(comm) }} onMouseLeave={() => { setRemoveDiv({ display: 'none' }) }}><BiDotsHorizontalRounded /></button>
                                                        }
                                                        {showCommentModal && (
                                                            <Modal onClose={() => setShowCommentModal(false)}>
                                                                <CommentModal commentId={commentId} setShowCommentModal={setShowCommentModal} setClicked={setClicked} />
                                                            </Modal>
                                                        )}
                                                    </div>}
                                            </div>)}
                                            </div>
                                        }
                                        {post?.post_comments.length > 1 && (
                                            <div>
                                                <a href={`/posts/${post?.id}`} className="viewall">view all comments</a>
                                                <div className="home-indv-comment">
                                                    <img className="home-post-profile-pic" src={post?.post_comments[post?.post_comments.length - 1].user_pic} alt="list of comments"></img>
                                                    <a href={`/users/${post?.post_comments['0'].user_id}`} className="span-username" ><strong>{post?.post_comments[post?.post_comments.length - 1].user}</strong></a>
                                                    <div className="shown-comment" onMouseEnter={() => { handleMouseEnter(post?.post_comments[[post?.post_comments.length - 1]]) }} onMouseLeave={e => { setRemoveDiv({ display: 'none' }) }}>{"  "}{post?.post_comments[post?.post_comments.length - 1].comment}</div>
                                                    {commentId === post?.post_comments[[post?.post_comments.length - 1]].id && user.id === post?.post_comments[post?.post_comments.length - 1].user_id &&
                                                        <button className="comment-dot" onClick={() => handleCommentClick(post?.post_comments[[post?.post_comments.length - 1]])} style={removeDiv} onMouseEnter={() => { handleMouseEnter(post?.post_comments[[post?.post_comments.length - 1]]) }} onMouseLeave={() => { setRemoveDiv({ display: 'none' }) }}><BiDotsHorizontalRounded /></button>
                                                    }
                                                    {showCommentModal && (
                                                        <Modal onClose={() => setShowCommentModal(false)}>
                                                            <CommentModal commentId={commentId} setShowCommentModal={setShowCommentModal} setClicked={setClicked} />
                                                        </Modal>
                                                    )}

                                                </div>
                                            </div>)
                                        }
                                        { }

                                    </div>
                                    <div className="footer-comment">
                                        <form className='home-comment-form' onSubmit={handleNewSubmit}>
                                            <textarea className="text-box-home" placeholder="Add a comment..." onClick={() => setPostsId(post?.id)} value={postsId === post?.id ? comments : ""} onChange={e => setComments(e.target.value)}></textarea>
                                            <button onClick={() => postDetails(post?.id, post?.user.id)} className="postt-button" type="submit">Post</button>
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
