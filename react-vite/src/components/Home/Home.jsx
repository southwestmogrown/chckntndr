import { useSelector } from "react-redux"
import "./Home.css"
import { Navigate } from "react-router-dom"
function Home() {
  const sessionUser = useSelector(state => state.session.user)
  return (
    sessionUser ? <div>
      <h1>Home Page</h1>
      <h2>{"Let's get started. Choose a friend to link up with."}</h2>
    </div> : <Navigate to="/" replace={true} />
  )
}

export default Home
