const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const LOAD_AVAILABLE_FRIENDS = "friends/LOAD_AVAILABLE_FRIENDS"

const setUser = (user, serverUrl) => ({
  type: SET_USER,
  payload: {user, serverUrl}
});

const removeUser = () => ({
  type: REMOVE_USER
});

const loadFriends = (payload) => ({
  type: LOAD_AVAILABLE_FRIENDS,
  payload: payload
});

export const thunkAuthenticate = () => async (dispatch) => {
	const res = await fetch("/api/auth/");
	if (res.ok) {
    const { user, serverUrl } = await res.json()
		dispatch(setUser(user, serverUrl));
	}
};

export const thunkLogin = (credentials) => async dispatch => {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials)
  });

  if(res.ok) {
    const data = await res.json();
    dispatch(setUser(data));
  } else if (res.status < 500) {
    const errorMessages = await res.json();
    return errorMessages
  } else {
    return { server: "Something went wrong. Please try again" }
  }
};

export const thunkSignup = (user) => async (dispatch) => {
  const res = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });

  if(res.ok) {
    const data = await res.json();
    dispatch(setUser(data));
  } else if (res.status < 500) {
    const errorMessages = await res.json();
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
    const payload = await res.json();
    console.log(payload)
    await dispatch(loadFriends(payload))
    return payload
  } else {
    return res
  }
}

export const thunkAddFriend = (id) => async (dispatch) => {
  const res = await fetch(`/api/friends/${id}/add`);

  if (res.ok) {
    const payload = await res.json()
    console.log("payload +++++++++++++++++++++++++++++++++ ", payload)
    await dispatch(loadFriends(payload))
    return payload
  } else {
    const errors = await res.json()
    return errors
  }
}

export const thunkRemoveFriend = (id) => async (dispatch) => {
  const res = await fetch(`/api/friends/${id}/remove`)

  if (res.ok) {
    const {user, users, pendingInvites} = await res.json()
    await dispatch(loadFriends({user, users, pendingInvites}))
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
    dispatch(loadFriends({user, users, pendingInvites}))
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
      return { 
        ...state, 
        user: action.payload.user, 
        serverUrl: action.payload.serverUrl 
      };
    case REMOVE_USER:
      return { ...state, user: null };
    case LOAD_AVAILABLE_FRIENDS:
      return { 
        ...state,
        user: { ...action.payload.user }, 
        availableFriends: { ...action.payload.users}, 
        pendingInvites: {...action.payload.pendingInvites}
      }
    default:
      return state;
  }
}

export default sessionReducer;
