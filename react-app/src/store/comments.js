const SET_COMMENT = 'comments/SET_COMMNET'


const setComment = (comment) => ({
    type: SET_COMMENT,
    comment
})



export const getComments = (postId) => async dispatch => {
    const res = await fetch(`/api/posts/${postId}/comments`)

    if (res.ok) {
        const comments = await res.json();
        dispatch(setComment(comments));
        return comments
    }
}



export const createComment = (payload) => async dispatch => {
    const { comment, post_id, user_id } = payload;

        console.log("before fetching comments", payload)
    const res = await fetch(`/api/posts/${post_id}/comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    if (res.ok) {
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
            console.log("action comment", action.comment)
            action.comment.forEach(comm => {
                newState[comm.id] = comm
            })
            return newState
        default:
            return state;
    }
}

export default comments
