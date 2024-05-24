import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { useEffect } from 'react'

import LoginFormModal from '../LoginFormModal'
import OpenModalButton from '../OpenModalButton'
import SignupFormModal from '../SignupFormModal'
import "./Landing.css"
import { thunkAuthenticate } from '../../redux/session'

function Landing() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user)
  useEffect(() => {
    dispatch(thunkAuthenticate());
  }, [dispatch]);

  if (sessionUser) return <Navigate to='/home' replace={ true }/>

  return (
    <div className="landing-container">

      <h1>Welcome to ChknTndr!</h1>
      <h2>A fun new way to find a place to eat with your friends and loved ones.</h2>
      <div className='btn-container'>
        <OpenModalButton
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
        />
        <OpenModalButton
          buttonText="Signup"
          modalComponent={<SignupFormModal />}
        />
      </div>
    </div>
  )
}

export default Landing
