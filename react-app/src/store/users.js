const GET_USERS = "users/GET_USERS";
const SET_USERS = "users/SET_USER"


const getUsers = (users) => ({
    type: GET_USERS,
    payload: users,
  });

  const setUser = (user) => ({
      type: SET_USERS,
      payload: user,
  })


export const setAUser = (id) => async (dispatch) => {
    const response = await fetch(`api/users/${id}`);

    if (response.ok) {
      const { user } = await response.json();
    //   console.log(users)
      dispatch(setUser(user));
    }
  };


  export const getAllUsers = () => async (dispatch) => {
    const response = await fetch("/api/users/");

    if (response.ok) {
      const { users } = await response.json();
    //   console.log(users)
      dispatch(getUsers(users));
    }
  };

  export const getAUser = (id) => async (dispatch) => {
    const response = await fetch(`api/users/${id}/`);

    if (response.ok) {
      const { users } = await response.json();
      dispatch(getUsers(users));
    }
  };

  const initialState = {};

  export default function users(state = initialState, action) {

    switch (action.type) {

      case GET_USERS: {
        return { ...state, ...action.payload };
      }

      case SET_USERS: {

      return { user: action.payload }
      }


      default:
        return state;
    }
  }
