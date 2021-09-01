
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import { getAllPosts, editPost, getPost } from '../../store/posts'
import { getAllUsers } from '../../store/users'
// import EditModal from '../EditModal.js'
// import DeleteModal from '../DeleteModal.js'
// import Modal from '../../context/Modal'
// import { BiDotsHorizontalRounded } from "react-icons/bi";
import '.././HomePage/HomePage.css'



function Post() {
    const { id } = useParams()
    const post = useSelector((state) => state.posts);
    // const user = useSelector(state => state.session.user);
    // const allUsers = useSelector(state => Object.values(state.users))
    // const [clicked, setClicked] = useState(false)
    // const [showEditModal, setShowEditModal] = useState(false);
    // const [showDeleteModal, setShowDeleteModal] = useState(false);
    // const [postsId, setPostsId] = useState(0);
    const dispatch = useDispatch();
    const [ postObj, setPostObj ] = useState(null);

   useEffect(() => {
      if (post) {
         const newPost = post[id];
         console.log('post object', newPost);

         setPostObj(newPost);
      }
   }, [post, id]);

    // const newId = posts.find(p => p.id === id)

    // useEffect(() => {
    //     dispatch(getAllPosts(allUsers))
    // }, [dispatch])

    useEffect(() => {
        dispatch(getPost(id))
    }, [dispatch])


    console.log("****", post)

    // const show = (post) => {
    //     setPostsId(post.id);
    //     setClicked(!clicked)
    //     }


    return (

        <div className="post-container">
            { postObj && <img src={postObj.picture_url}></img>}

        </div>

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
