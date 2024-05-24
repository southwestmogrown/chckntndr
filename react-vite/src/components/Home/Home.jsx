import { Navigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import "./Home.css"
import { thunkRemoveFriend } from "../../redux/session"
import { useEffect } from "react"
import { thunkLoadFriends } from "../../redux/friends"
import PendingInvites from "./PendingInvites"
import PendingRequests from "./PendingRequests"
import UserFriends from "./UserFriends"

function Home() {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user)
  const friends = useSelector(state => state.session.user?.friends)
  const availableFriends = useSelector(state => state.friends.availableFriends)




  useEffect(() => {
    dispatch(thunkLoadFriends())
  }, [dispatch])


  const removeFriend = async (e, id) => {
    e.preventDefault()

    await dispatch(thunkRemoveFriend(id))
  }

  return (
    sessionUser ? <div className="homepage-container">
      <h1>Welcome {sessionUser.username}</h1>
      <h2>{"Let's get started. Choose a friend to link up with."}</h2>
      <div className="friendships-container">
        <UserFriends 
          handleClick={removeFriend}
        />
        <PendingInvites 
          availableFriends={availableFriends} 
          handleClick={removeFriend} 
        />
        <PendingRequests 
          friends={friends} 
          sessionUser={sessionUser} 
          handleClick={removeFriend} 
        />
      </div>
    </div> : <Navigate to="/" replace={true} />
  )
}

export default Home
