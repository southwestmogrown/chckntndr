import { Navigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import "./Home.css"
import { thunkRemoveFriend, thunkLoadFriends } from "../../redux/session"
import { Typography, Box, Container } from "@mui/material"
import { useEffect } from "react"
import PendingInvites from "./PendingInvites"
import PendingRequests from "./PendingRequests"
import UserFriends from "./UserFriends"
import Friends from "../FriendsHome"
import { useTheme } from "@emotion/react"

function Home() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const sessionFriends = useSelector(state => state.session.user?.friends);



  useEffect(() => {
    dispatch(thunkLoadFriends())
  }, [dispatch])


  const removeFriend = async (e, id) => {
    e.preventDefault()

    await dispatch(thunkRemoveFriend(id))
  }

  return (
    sessionFriends
    ? 
      <Box 
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflowY: "hidden",
          [theme.breakpoints.down("sm")]: {
            overflowY: "scroll",
            overflowX: "none",
            width: "100%",
            height: "100%",
            borderRadius: 0
          }
        }}  
      >
        <Typography 
          variant="h1" 
          sx={{ 
            color: "secondary.main", 
            [theme.breakpoints.down("sm")]: {
              display: "none"
            } 
          }}
          
        >
          Welcome {sessionUser.username}
        </Typography>
        {sessionFriends?.length > 0 || sessionUser?.requests.length > 0
          ? 
            <Container
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }} 
            >
              <Typography 
                variant="h2" 
                sx={{ 
                  color: "secondary.main", 
                  borderBottom: `3px solid`,
                  borderBottomColor: "secondary.text",
                  paddingBottom: "10px"
                }}
              >
                {"Let's get started. Choose a friend to link up with."}
              </Typography>
            <Container 
              sx={{
                display: "flex",
                justifyContent: "space-around",
                marginTop: "20px"
              }}
            >
              <UserFriends />
              <PendingInvites 
                handleClick={removeFriend} 
              />
              <PendingRequests />
            </Container>
          </Container>
        :
          <Friends />
        }
      </Box> 
    : 
        <Navigate to="/" replace={true} />
  )
}

export default Home
