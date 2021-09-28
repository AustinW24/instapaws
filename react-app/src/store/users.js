const GET_USERS = "users/GET_USERS";
const SET_USER = "users/SET_USER"
const GET_FOLLOWING = "followers/GET_FOLLOWING";



const getUsers = (users) => ({
    type: GET_USERS,
    payload: users,
  });

  const getFollowing = (user) => ({
    type: GET_FOLLOWING,
    payload: user,
  });


  export const getAllUsers = () => async (dispatch) => {
    const response = await fetch("/api/users/");

    if (response.ok) {
      const { users } = await response.json();
      dispatch(getUsers(users));
    }
  };

  export const getAUser = (id) => async (dispatch) => {
    const response = await fetch(`api/users/${id}/`);

    if (response.ok) {
      const { user } = await response.json();
      dispatch(getUsers(user));
    }
  };

  export const getFollowers = (id) => async (dispatch) => {
      const response = await fetch(`/api/users/${id}/following`);

      if(response.ok) {
          const users = await response.json();
          dispatch(getFollowing(users));
      }
  }


  const initialState = {};

  export default function users(state = initialState, action) {

    switch (action.type) {

      case GET_USERS: {
        return { ...state, ...action.payload };
      }

      case SET_USER: {
      return { user: action.payload }
      }

      case GET_FOLLOWING: {
          return { user: action.payload }
      }

      default:
        return state;
    }
  }
