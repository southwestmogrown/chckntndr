import { useSelector } from "react-redux"
import "./Home.css"
import { Container, Typography } from "@mui/material"
import { useTheme } from "@emotion/react"
import FriendCard from "../FriendsHome/FriendCard"

function PendingRequests() {
  const theme = useTheme()
  const sessionUser = useSelector(state => state.session.user)
  const friends = useSelector(state => state.session?.user?.friends)

  const findApprovalForRequestsSent = (friend) => {
    const req = friend.requests.find(req => req.current_user === friend.id && req.inviting_user === sessionUser.id)
    return req.approved
  }

  return (
    friends && <Container 
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "5%",
        width: "40%",
        minHeight: "400px",
        overflowY: "scroll",
        overflowX: "none",
        borderBottom: "5px solid gray",
        [theme.breakpoints.down("sm")]: {
          width: "100%",
          height: "100%",
        }
      }}
    >
      <Typography variant="h3" sx={{color: "secondary.main"}}>Pending Requests</Typography>
      {friends.length > 0 && friends?.map(friend => (
        <>
          {
            findApprovalForRequestsSent(friend) === 0 &&
            <FriendCard friend={friend} />
          }  
        </>    
      ))}
    </Container>
  )
}

export default PendingRequests
