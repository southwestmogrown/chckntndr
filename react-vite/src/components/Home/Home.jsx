import { useSelector } from "react-redux"
import "./Home.css"
import { Navigate } from "react-router-dom"
function Home() {
  const sessionUser = useSelector(state => state.session.user)
  return (
    sessionUser ? <div className="homepage-container">
      <h1>Welcome {sessionUser.username}</h1>
      <h2>{"Let's get started. Choose a friend to link up with."}</h2>
      {sessionUser.friends.map(friend => (
        <p className="friend" key={friend.id}>{friend.username}</p>
      ))}
    </div> : <Navigate to="/" replace={true} />
  )
}

export default Home
