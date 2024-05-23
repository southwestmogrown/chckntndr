import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import "./FriendsHome.css"
import { thunkAddFriend, thunkLoadFriends } from "../../redux/friends"

function FriendsHome() {
  const dispatch = useDispatch();

  let friends = useSelector(state => state.friends.availableFriends);
  friends = Object.values(friends);

  useEffect(() => {
    dispatch(thunkLoadFriends())
  }, [dispatch]);

  const onClick = async (e, id) => {
    e.preventDefault()

    await dispatch(thunkAddFriend(id))
  }

  return (
    friends ? <div>
      <h1>Find your friends!</h1>
      {friends.map(friend => (
        <div key={friend.id} className="friend-card">
          <p >{friend.username}</p>
          <button onClick={(e) => onClick(e, friend.id)}>Add Friend</button>
        </div>
      ))}
    </div> : <h1>Loading...</h1>
  )
}

export default FriendsHome
