import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Box, Container, Typography, useMediaQuery, useTheme } from '@mui/material'

import LoginFormModal from '../LoginFormModal'
import OpenModalButton from '../OpenModalButton'
import SignupFormModal from '../SignupFormModal'
import "./Landing.css"
import { thunkAuthenticate } from '../../redux/session'

function Landing() {
  const dispatch = useDispatch();
  const theme = useTheme()
  const md = useMediaQuery(theme.breakpoints.down('md'))

  const sessionUser = useSelector(state => state.session.user)
  useEffect(() => {
    dispatch(thunkAuthenticate());
  }, [dispatch]);

  if (sessionUser) return <Navigate to='/home' replace={ true }/>

  return (
    <Box
      sx={{ 
        bgcolor: 'secondary.main',
        height: "80%",
        width: "60%",
        boxShadow: 20,
        borderRadius: "25px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        [theme.breakpoints.down("sm")]: {
          overflowY: "scroll",
          overflowX: "none",
          width: "100%",
          height: "100%",
          borderRadius: 0
        }
      }}  
      maxWidth="lg"
    >
      <Typography 
        variant='h1'
        sx={{ 
          color: 'primary.text',
          [theme.breakpoints.down("md")]: {
            display: "none"
          },
          [theme.breakpoints.down("lg")]: {
            fontSize: "64px"
          },
          [theme.breakpoints.up("lg")]: {
            fontSize: "68px"
          },
        }}
      >
        Welcome to ChknTndr!
      </Typography>
      <Box  
        component="img"
        src="../../chkntndr-landing.png"
        alt="ChknTndr landing rooster image"
        sx={{
          [theme.breakpoints.down("lg")]: {
            height: "300px"
          },
          [theme.breakpoints.up("lg")]: {
            height: "350px",
          },
        }}
      />
      <Typography 
        variant='h3'
        sx={{ 
          color: 'primary.text', 
          width: "60%",
          [theme.breakpoints.down("sm")]: {
            fontSize: "18px",
            textAlign: "center"
          },
          [theme.breakpoints.down("md")]: {
            fontSize: "22px",
            textAlign: "center"
          },
          [theme.breakpoints.down("lg")]: {
            fontSize: "28px",
            textAlign: "center"
          },
          [theme.breakpoints.down("xl")]: {
            fontSize: "28px",
            textAlign: "center"
          },
          [theme.breakpoints.up("xl")]: {
            fontSize: "30px",
            textAlign: "center"
          },
        }}
      >
        A fun new way to find a place to eat with your friends and loved ones.
      </Typography>
      <Container
        sx={{
          display: "flex",
          justifyContent: md ? "center" : "space-around",
          alignItems: "center",
          width: "50%",
          marginTop: "2em",
          [theme.breakpoints.down("md")]: {
            width: "100%"
          }
        }}
      >
        <OpenModalButton
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
        />
        <OpenModalButton
          buttonText="Signup"
          modalComponent={<SignupFormModal />}
        />
      </Container>
    </Box>
  )
}

export default Landing
