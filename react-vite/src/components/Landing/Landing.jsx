import { useSelector } from 'react-redux'
import LoginFormModal from '../LoginFormModal'
import OpenModalButton from '../OpenModalButton'
import SignupFormModal from '../SignupFormModal'
import "./Landing.css"
import { Navigate } from 'react-router-dom'

function Landing() {
  const sessionUser = useSelector(state => state.session.user)
  if (sessionUser) return <Navigate to='/home' replace={ true }/>
  return (
    <div className="landing-container">

      <h1>Welcome to ChknTndr!</h1>
      <h2>A fun new way to find a place to eat with your friends and loved ones.</h2>
      <OpenModalButton
        buttonText="Log In"
        modalComponent={<LoginFormModal />}
      />
      <OpenModalButton
        buttonText="Signup"
        modalComponent={<SignupFormModal />}
      />
    </div>
  )
}

export default Landing
