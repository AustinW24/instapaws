const GET_USERS = "users/GET_USERS";



const getUsers = (users) => ({
    type: GET_USERS,
    payload: users,
  });



  export const getAllUsers = () => async (dispatch) => {
    const response = await fetch("/api/users");

    if (response.ok) {
      const { users } = await response.json();
      console.log(users)
      dispatch(getUsers(users));
    }
  };

  export const getAUser = (id) => async (dispatch) => {
    const response = await fetch(`api/users/${id}`);

    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$users")
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


      default:
        return state;
    }
  }
