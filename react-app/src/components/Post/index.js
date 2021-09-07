
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import { getAllPosts, editPost, getPost } from '../../store/posts'
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
    const allUsers = useSelector(state => Object.values(state.users))
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showCommentModal, setShowCommentModal] = useState(false);
    const [comments, setComments] = useState('');
    const [postUserId, setPostUserId] = useState(0);
    const [clicked, setClicked] = useState(false);
    const [removeDiv, setRemoveDiv] = useState({display: 'none'})




    const [postsId, setPostsId] = useState(0);
    const dispatch = useDispatch();
    const [postObj, setPostObj] = useState(null);

    useEffect(() => {
        if (post) {
            const newPost = post[id];
            console.log('post object', newPost);

            setPostObj(newPost);
        }
    }, [post, id]);


    useEffect(() => {
        dispatch(getAllUsers())
    }, [dispatch])

    useEffect(() => {
        dispatch(getPost(id))
    }, [dispatch])


        const handleDeleteSubmit = async e => {
    e.preventDefault()

    await dispatch(deleteComment())
  }


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


    return (
        <div className="post-comments">
            <div className="post-container">
                {postObj && <img className="postid-pic" src={postObj?.picture_url}></img>}
            </div>
            <div className="comments-container">
                <div className="comments-header">
                    {postObj && <img className="bottom-profile-pic" src={postObj?.user.profile_picture}></img>}
                    <div className="bottom-homepage-username">{postObj?.user.username}</div>
                     {postObj?.user_id == user.id &&
                                        <button className='post-dropdown' onClick={() => show(post)}><BiDotsHorizontalRounded /></button>
                                    }
                     {clicked &&

                                        <div className="dot-dropdown">
                                            <a className="edit-button" onClick={() => setShowEditModal(true)}>edit</a>
                                            {showEditModal && (
                                                <Modal onClose={() => setShowEditModal(false)}>
                                                    <EditModal post={postObj} setShowEditModal={setShowEditModal} setClicked={setClicked}/>
                                                </Modal>
                                            )}
                                            <a className="delete-button" onClick={() => setShowDeleteModal(true)}>delete</a>
                                            {showDeleteModal && (
                                                <Modal onClose={() => setShowDeleteModal(false)}>
                                                    <DeleteModal post={postObj} setShowDeleteModal={setShowDeleteModal} setClicked={setClicked}/>
                                                </Modal>
                                            )}
                                        </div>
                                    }
                </div>
                    <div className="user-caption"><img className="bottom-profile-pic" src={postObj?.user.profile_picture}></img>{postObj?.caption}</div>
                    <div className="comment-scroll">
                    <div>{postObj?.post_comments.map((comm, idx) =>
                    <div className={'indv-comment'} key={idx}>
                    <ul className="comments-list">
                    <li className="comment-row">
                    <img className="post-profile-av" src={comm?.user_pic}></img>
                    {user.username !== comm?.user ? (

                        <span>{comm?.comment}</span>
                    ) : (<div>
                        <span onMouseEnter={e => {setRemoveDiv({display: 'block'}) }}
                    onMouseLeave={e => { setRemoveDiv({display: 'none'}) }} className="post-comment">{comm?.comment}</span>

                         <button onMouseEnter={e => {setRemoveDiv({display: 'block'})}} onMouseLeave={e => { setRemoveDiv({display: 'none'}) }} className="comment-dot" style={removeDiv} onClick={() => setShowCommentModal(true)}><BiDotsHorizontalRounded/></button>

                                                    {showCommentModal && (
                                                        <Modal onClose={() => setShowCommentModal(false)}>
                                                    <CommentModal comm={comm} setShowCommentModal={setShowCommentModal} setClicked={setClicked}/>
                                                </Modal>
                                            )}
                    </div>
                    )
                    }
                                                </li>
                    </ul>
                    </div>)}
                    </div>

                                        <form className='comment-form' onSubmit={handleNewSubmit}>
                                                <textarea  className="text-box" placeholder="Add a comment..." value={comments} onChange={e => setComments(e.target.value)}></textarea>
                                                <button  className="post-button" onClick={() => postDetails(postObj?.id, postObj?.user.id)} type="submit">Post</button>
                                         </form>
                    </div>
            </div>
        </div >



    )
}


export default Post
