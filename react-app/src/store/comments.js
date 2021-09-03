const SET_COMMENT = 'comments/SET_COMMENT'


const setComment = (comment) => ({
    type: SET_COMMENT,
    comment
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

const initialState = {};


const comments = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case SET_COMMENT:
            const newState = {...state, ...action.comment}
            return newState
        default:
            return state;
    }
}

export default comments
