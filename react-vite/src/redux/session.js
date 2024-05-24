const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const LOAD_AVAILABLE_FRIENDS = "friends/LOAD_AVAILABLE_FRIENDS"

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER
});

const loadFriends = (friends) => ({
  type: LOAD_AVAILABLE_FRIENDS,
  friends
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

export const thunkLoadFriends = () => async (dispatch) => {
  const res = await fetch('/api/friends')

  if (res.ok) {
    const friends = await res.json();
    console.log(friends)
    await dispatch(loadFriends(friends))
    return friends
  } else {
    return res
  }
}

export const thunkAddFriend = (id) => async (dispatch) => {
  const res = await fetch(`/api/friends/${id}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(id)
  });

  if (res.ok) {
    const updatedFriends = await res.json()
    await dispatch(loadFriends(updatedFriends))
    return updatedFriends
  } else {
    const errors = await res.json()
    return errors
  }
}

export const thunkRemoveFriend = (id) => async (dispatch) => {
  const res = await fetch(`/api/friends/${id}/remove`)

  if (res.ok) {
    const {user, users, pendingInvites} = await res.json()
    await dispatch(setUser(user));
    await dispatch(loadFriends({users, pendingInvites}))
    return user;
  } else {
    const errors = await res.json()
    return errors;
  }
}

export const thunkAcceptFriend = (id) => async (dispatch) => {
  const res = await fetch(`/api/friends/${id}/accept`)

  if (res.ok) {
    const {user, users, pendingInvites} = await res.json();
    dispatch(setUser(user));
    dispatch(loadFriends({users, pendingInvites}))
    return user;
  } else {
    const errors = await res.json();
    return errors;
  }
}

const initialState = { user: null, availableFriends: {}, pendingInvites: {} };

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
      case LOAD_AVAILABLE_FRIENDS:
        return { 
          ...state, 
          availableFriends: { ...action.friends.users}, 
          pendingInvites: {...action.friends.pendingInvites}
        }
    default:
      return state;
  }
}

export default sessionReducer;
