const SET_COMMENT = 'comments/SET_COMMENT'
const REMOVE_COMMENT = 'comments/REMOVE_COMMENT'



const setComment = (comment) => ({
    type: SET_COMMENT,
    comment
})

const removeComment = (id) => ({
    type: REMOVE_COMMENT,
    id
})



export const getComments = (postId) => async dispatch => {
    const res = await fetch(`/api/comments${postId}`)
    if (res.ok) {
        const comments = await res.json();
        dispatch(setComment(comments));
        return comments
    }
}


export const createComment = (payload) => async dispatch => {
    const { comments, post_id, user_id } = payload;

        console.log("before fetching comments", payload)
    const res = await fetch(`/api/comments/${post_id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            comments, post_id, user_id
        })
    });

    if (res.ok) {
        console.log("RES OKAY")
        const data = await res.json();
        dispatch(setComment(data))
        return data
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const deleteComment = (id) => async dispatch => {
    console.log("before fetch delete")
    const res = await fetch(`/api/comments/${id}`, {
        method: 'DELETE'
    })

    if (res.ok) {
        await res.json();
        dispatch(removeComment(id))
    }
}



const initialState = {};


const comments = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case SET_COMMENT:
            const newState = {...state, ...action.comment}
            return newState
        case REMOVE_COMMENT:
            delete newState[action.id]
            return newState
        default:
            return state;
    }
}

export default comments
