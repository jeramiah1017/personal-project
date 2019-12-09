const initialState = {

    email: "",
    username: "",
    user_id: "",
    bio: ""
};

const UPDATE_USER = "UPDATE_USER";
const UPDATE_BIO = "UPDATE_BIO";

export function updateUser(userObj) {
  return {
    type: UPDATE_USER,
    payload: userObj
  };
}



export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER:
      return { ...state, ...action.payload };
      case UPDATE_BIO:
        state.bio = action.value
        return {
          ...state
        }
    default:
      return state;
  }
}
