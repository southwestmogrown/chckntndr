import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useTheme } from "@emotion/react"
import { Container, Typography } from "@mui/material"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import "./Friends.css"
import { thunkAddFriend, thunkLoadFriends } from "../../redux/session"
import FriendCard from "./FriendCard";

function Friends() {
  const theme = useTheme()

  const dispatch = useDispatch();
  let friends = useSelector(state => state.session.availableFriends);
  friends = Object.values(friends);

  

  useEffect(() => {
    dispatch(thunkLoadFriends())
  }, [dispatch]);

  const onClick = async (e, id) => {
    e.preventDefault()

    await dispatch(thunkAddFriend(id))
  }

  return (
    friends 
    ? 
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center"
      }}
    >
      <Typography 
        variant="h2" 
        sx={{ 
          color: "secondary.main",
          [theme.breakpoints.down("sm")]: {
            display: "none"
          },
        }}
      >
        Looks like you haven&apos;t added any friends, let&apos;s find them!
      </Typography>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "5%",
          width: "40%",
          minHeight: "400px",
          maxHeight: "400px",
          overflowY: "scroll",
          overflowX: "none",
          borderBottom: "5px solid gray",
          [theme.breakpoints.down("sm")]: {
            width: "100%",
            height: "100%",
          }
        }}
      >
        {friends.map(friend => (
          <FriendCard key={friend.id}  friend={friend} onClick={onClick} />
        ))}
      <KeyboardArrowDownIcon 
        className="chevron-down"
        sx={{
          color: "primary.main",
          position: "fixed",
          top: "750px",
          zIndex: 1,
        }}
        fontSize="large"
      />
      </Container>
    </Container> 
    : 
    <h1>Loading...</h1>
  )
}

export default Friends
