const GET_USERS = "users/GET_USERS";
const SET_USER = "users/SET_USER"



const getUsers = (users) => ({
    type: GET_USERS,
    payload: users,
  });

const setUsers = (users) => ({
    type: SET_USER,
    payload: users,
  });


  export const getAllUsers = () => async (dispatch) => {
    const response = await fetch("/api/users/");

    if (response.ok) {
      const { users } = await response.json();
    //   console.log(users)
      dispatch(getUsers(users));
    }
  };

  export const getAUser = (id) => async (dispatch) => {
      console.log("inside thunk for getuser@@@@")
    const response = await fetch(`api/users/${id}/`);

    if (response.ok) {
      console.log("inside thunk AFTER getuser@@@@")

      const { user } = await response.json();
      dispatch(getUsers(user));
    }
  };


//   export const userSearch = ({username}) => async dispatch => {
//       const res = await fetch('api/users/search', {
//           method: "POST",
//           headers: {
//               "Content-Type": "application/json"
//           },
//           body: JSON.stringify({
//               username
//             })
//       })
//       if (res.ok) {
//         const users = await res.json();
//         dispatch(getUsers(users))
//       }
//   }


  const initialState = {};

  export default function users(state = initialState, action) {

    switch (action.type) {

      case GET_USERS: {
        return { ...state, ...action.payload };
      }

      case SET_USER: {

      return { user: action.payload }
      }


      default:
        return state;
    }
  }
