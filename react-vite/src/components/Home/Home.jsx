import { Navigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import "./Home.css"
import { thunkRemoveFriend } from "../../redux/session"

function Home() {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user)
  const friends = useSelector(state => state.session.user?.friends)



  const handleClick = async (e, id) => {
    e.preventDefault()

    await dispatch(thunkRemoveFriend(id))
  }

  return (
    sessionUser ? <div className="homepage-container">
      <h1>Welcome {sessionUser.username}</h1>
      <h2>{"Let's get started. Choose a friend to link up with."}</h2>
      {friends.map(friend => (
        <div  key={friend.id} className="friend-card">
          <p className="friend">{friend.username}</p>
          <button onClick={(e) => handleClick(e, friend.id)}>Remove Friend</button>
        </div>
      ))}
    </div> : <Navigate to="/" replace={true} />
  )
}

export default Home
