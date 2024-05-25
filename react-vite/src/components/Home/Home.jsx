import { Navigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import "./Home.css"
import { thunkRemoveFriend, thunkLoadFriends } from "../../redux/session"
import { useEffect } from "react"
import PendingInvites from "./PendingInvites"
import PendingRequests from "./PendingRequests"
import UserFriends from "./UserFriends"
import GroupChat from "../GroupChat"

function Home() {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user)




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
        <GroupChat />
        <PendingInvites 
          handleClick={removeFriend} 
        />
        <PendingRequests  
          handleClick={removeFriend} 
        />
      </div>
    </div> : <Navigate to="/" replace={true} />
  )
}

export default Home
