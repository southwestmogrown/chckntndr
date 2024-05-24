const LOAD_AVAILABLE_FRIENDS = "friends/LOAD_AVAILABLE_FRIENDS"

const loadFriends = (friends) => ({
  type: LOAD_AVAILABLE_FRIENDS,
  friends
});

export const thunkLoadFriends = () => async (dispatch) => {
  const res = await fetch('/api/friends')

  if (res.ok) {
    const friends = await res.json();
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

// export const thunkAcceptFriend = (id) => async (dispatch) => {
//   console.log(id)
//   const res = await fetch(`/api/friends/${id}/accept`)

//   if (res.ok) {
//     const data = await res.json()
//     console.log(data)
//   }
// }


const initialState = { availableFriends: {} }

const friendsReducer = (state=initialState, action) => {
  switch (action.type) {
    case LOAD_AVAILABLE_FRIENDS:
      return { ...state, availableFriends: { ...action.friends}}
    default:
      return state
  }
}

export default friendsReducer