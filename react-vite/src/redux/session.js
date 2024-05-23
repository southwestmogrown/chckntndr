const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER
});

export const thunkAuthenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/");
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const thunkLogin = (credentials) => async dispatch => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials)
  });

  if(response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages
  } else {
    return { server: "Something went wrong. Please try again" }
  }
};

export const thunkSignup = (user) => async (dispatch) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });

  if(response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages
  } else {
    return { server: "Something went wrong. Please try again" }
  }
};

export const thunkLogout = () => async (dispatch) => {
  await fetch("/api/auth/logout");
  dispatch(removeUser());
};

export const thunkRemoveFriend = (id) => async (dispatch) => {
  const res = await fetch(`/api/friends/${id}/remove`)

  if (res.ok) {
    const updatedUser = await res.json()
    await dispatch(setUser(updatedUser));
    return updatedUser;
  } else {
    const errors = await res.json()
    return errors;
  }
}

const initialState = { user: null, friends: [] };

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      console.log(action.payload)
      return { ...state, user: action.payload, friends: [...action.payload.friends] };
    case REMOVE_USER:
      return { ...state, user: null, friends: [] };
    default:
      return state;
  }
}

export default sessionReducer;
