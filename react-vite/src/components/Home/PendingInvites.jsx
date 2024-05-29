import { useSelector } from "react-redux"
import "./Home.css"
import { useTheme } from "@emotion/react"
import { Container, Typography } from "@mui/material"
import FriendCard from "../FriendsHome/FriendCard"

function PendingInvites() {
  const theme = useTheme()
  const pendingInvites = useSelector(state => state.session.pendingInvites)
  const pendingArr = Object.values(pendingInvites)

  return (
    <Container 
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
      <Typography variant="h3" sx={{color: "secondary.main"}}>Pending Invitations</Typography>
      {pendingArr.length > 0 && pendingArr.map(friend => (
        <FriendCard key={friend.id} friend={friend} />
      ))}
    </Container>
  )
}

export default PendingInvites
