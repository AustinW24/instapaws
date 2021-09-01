
const GET_POSTS = 'posts/GET_POSTS'
const GET_POST = 'posts/GET_POST'
// const GET_ALL_POSTS = 'posts/GET_ALL_POSTS'
const REMOVE_POST = 'posts/REMOVE_POST'
const EDIT_POST = 'posts/EDIT_POST'
// const LIKE_POST = 'posts/LIKE_POST'
const CREATE_POST = 'posts/CREATE_POST'

const setPosts = (posts) => ({
    type: GET_POSTS,
    payload: posts
})
const setPost = (post) => ({
    type: GET_POST,
    post,
})


const actionRemovePost = (id) => ({
    type: REMOVE_POST,
    id
})

const actionEditPost = (post) => ({
    type: EDIT_POST,
    post
})

const actionCreatePost = (post) => ({
    type: CREATE_POST,
    payload: post
})

// const actionLikePost = (post) => ({
//     type: LIKE_POST,
//     post,
// });





// export const getPosts = () => async dispatch => {
//     const req = await fetch('/api/posts');
//     if (req.ok) {
//         const posts = await req.json();
//         dispatch(actionGetPosts(posts));
//     }
//     return req;
// }

export const getAllPosts = () => {
    return async (dispatch) => {
        const response = await fetch('/api/posts/', {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (response.ok) {
            const { posts } = await response.json();
            dispatch(setPosts(posts))
        }
        return response
    }
}

export const getPost = (id) => async dispatch => {
    const res = await fetch(`/api/posts/${id}`)
    console.log('inside thunk for getPost')
    if (res.ok) {
        console.log("RES IS OK for thunk getPost")
        const  post   = await res.json()
        console.log(post)
        dispatch(setPost(post))
    }
    return res
}

export const removePost = (id) => async dispatch => {
    const res = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
    })

    if (res.ok) {
        const removed = await res.json();
        await dispatch(actionRemovePost(id));
        return removed
    }
}

export const editPost = (post) => async dispatch => {
    const { id, caption } = post;

    const res = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", 'Accept': 'application/json' },
        body: JSON.stringify(post)
    });

    if (res.ok) {
        const data = await res.json();
        await dispatch(actionEditPost(data))
        return data
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data.errors
        }
    } else {
        return ['An error occurred while processing.']
    }
}


export const createPost = (picture_url, caption) => async dispatch => {
    const req = await fetch('/api/posts/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            caption,
            picture_url
        })
    });

    if (req.ok) {
        const data = await req.json();
        await dispatch(actionCreatePost(data))

    } else if (req.status < 500) {
        const data = await req.json();
        return data.errors;
    } else {
        return ['An error occurred while creating post.']
    }
};


// export const likePost = (post) => async dispatch => {
//     const { id } = post;

//     let res = await fetch(`/api/posts/${id}/like`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(post)
//     });

//     if (res.ok) {
//         const response = await res.json();
//         dispatch(actionLikePost(res))
//         return response
//     };
// };



const initialState = {}

export default function posts(state = initialState, action) {
    switch (action.type) {
        case GET_POSTS: {

            return { ...state, ...action.payload };
        }
        case GET_POST: {

            return { ...state, ...action.post };
        }
        // case GET_ALL_POSTS:

        //     return { ...state, ...action.posts }

        case CREATE_POST: {

            const newState = { ...state }
            return newState;
        }
        case EDIT_POST: {

            const updatedState = { ...state, [action.post.id]: action.post }
            return updatedState;
        }
        case REMOVE_POST: {

            const removedState = { ...state }
            delete removedState[action.id]
            return removedState
        }
        default:
            return state
    }
};
