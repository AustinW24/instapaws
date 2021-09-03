
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import { getAllPosts, editPost, getPost } from '../../store/posts'
import { getComments } from '../../store/comments'
import { getAllUsers } from '../../store/users'
// import EditModal from '../EditModal.js'
// import DeleteModal from '../DeleteModal.js'
// import Modal from '../../context/Modal'
// import { BiDotsHorizontalRounded } from "react-icons/bi";
import './Post.css'



function Post() {
    const { id } = useParams()
    const post = useSelector((state) => state.posts);
    // const user = useSelector(state => state.session.user);
    const allUsers = useSelector(state => Object.values(state.users))
    // const [clicked, setClicked] = useState(false)
    // const [showEditModal, setShowEditModal] = useState(false);
    // const [showDeleteModal, setShowDeleteModal] = useState(false);
    // const [postsId, setPostsId] = useState(0);
    const dispatch = useDispatch();
    const [postObj, setPostObj] = useState(null);

    useEffect(() => {
        if (post) {
            const newPost = post[id];
            console.log('post object', newPost);

            setPostObj(newPost);
        }
    }, [post, id]);

    // const postUserId = postObj

    useEffect(() => {
        dispatch(getAllUsers())
    }, [dispatch])

    useEffect(() => {
        dispatch(getPost(id))
    }, [dispatch])


    console.log("****", postObj?.post_comments['0'])

    // const show = (post) => {
    //     setPostsId(post.id);
    //     setClicked(!clicked)
    //     }


    return (
        <div className="post-comments">
            <div className="post-container">
                <span>hello</span>
                {postObj && <img className="postid-pic" src={postObj.picture_url}></img>}
            </div>
            <div className="comments-container">
                <div className="comments-header">
                    {postObj && <img className="bottom-profile-pic" src={postObj?.user.profile_picture}></img>}
                    <div className="bottom-homepage-username">{postObj?.user.username}</div>
                </div>
                    <div>{postObj?.post_comments.map((comm, idx) => <div className={'indv-comment'} key={idx}>
                    <img className="post-profile-pic" src={comm?.user_pic}></img>
                    <div>{comm?.comment}</div>
                    </div>)}
                    </div>
                <div className="homepage-comments"></div>
            </div>
        </div >

        // <button className='post-dropdown' onClick={() => show()}><BiDotsHorizontalRounded /></button>

        // {clicked &&
        //     <div className="dot-dropdown">
        //         <a className="edit-button" onClick={() => setShowEditModal(true)}>edit</a>
        //         {showEditModal && (
        //             <Modal onClose={() => setShowEditModal(false)}>
        //                 <EditModal  setShowEditModal={setShowEditModal} />
        //             </Modal>
        //         )}
        //         <a className="delete-button" onClick={() => setShowDeleteModal(true)}>delete</a>
        //         {showDeleteModal && (
        //             <Modal onClose={() => setShowDeleteModal(false)}>
        //                 <DeleteModal  setShowDeleteModal={setShowDeleteModal} />
        //             </Modal>
        //         )}





    )
}


export default Post
