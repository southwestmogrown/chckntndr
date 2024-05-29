import { useTheme } from '@emotion/react'
import { Avatar, Button, Card, CardHeader, Container, Typography, useMediaQuery } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { thunkAcceptFriend, thunkRemoveFriend } from '../../redux/session';

function FriendCard({ friend, onClick }) {
  const dispatch = useDispatch()
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const md = useMediaQuery(theme.breakpoints.down('md'));
  const lg = useMediaQuery(theme.breakpoints.down('lg'));

  const sessionFriends = useSelector(state => state.session.user.friends);
  const sessionUser = useSelector(state => state.session.user);
  const pendingInvites = useSelector(state => state.session.pendingInvites);

  const handleAccept = (e, friend_id) => {
    e.preventDefault()
    dispatch(thunkAcceptFriend(friend_id))
  }

  const removeFriend = async (e, id) => {
    e.preventDefault()

    await dispatch(thunkRemoveFriend(id))
  }

  return (
    <Card 
      className="friend-card"
      sx={{
        bgcolor: "secondary.main",
        width: "15rem",
        marginTop: "2rem",
        minHeight: "auto",
        padding: "10px"
      }}
    >
      <CardHeader 
        avatar={
          <Avatar 
            src="../../chkntndr-logo.png" 
            alt="chkn-logo"
            sx={{
              width: 48,
              height: 48,
              flexGrow: 1
            }}
          />
        }
        title={
          <Typography variant="h4" sx={{ color: "primary.text", textAlign: "left"}} >{friend.username}</Typography>
        }
      />
      
      {sessionFriends.includes(friend) && friend.friends.includes(sessionUser.id)
        &&
          <Container 
            sx={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: "10px"
            }}
          >
            <Button
              onClick={() => console.log("working...")}
              variant="contained"
              size="sm"
              sx={{ color: "primary.text" }}
              style={{fontSize: sm ? "0.5rem" : md ? "0.65rem" : lg ? "0.7rem" : "0.75rem"}}
            >
              Add To Party
            </Button>
            <Button
              onClick={(e) => removeFriend(e, friend.id)}
              variant="contained"
              size="sm"
              sx={{ color: "primary.text" }}
              style={{fontSize: sm ? "0.5rem" : md ? "0.65rem" : lg ? "0.7rem" : "0.75rem"}}
            >
              Delete
            </Button>
          </Container>
        }
        { pendingInvites[friend.id] !== undefined && 
          <Container 
            sx={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: "10px"
            }}
          >
            <Button
              onClick={(e) => handleAccept(e, friend.id)}
              variant="contained"
              size="sm"
              sx={{ color: "primary.text" }}
              style={{fontSize: sm ? "0.5rem" : md ? "0.65rem" : lg ? "0.7rem" : "0.75rem"}}
            >
              Accept
            </Button>
            <Button
              onClick={(e) => removeFriend(e, friend.id)}
              variant="contained"
              size="sm"
              sx={{ color: "primary.text" }}
              style={{fontSize: sm ? "0.5rem" : md ? "0.65rem" : lg ? "0.7rem" : "0.75rem"}}
            >
              Decline
            </Button>
          </Container>
        }
        { !sessionFriends.includes(friend) && sessionUser.requests.filter(r => r.inviting_user === friend.id).length === 0 &&
          <Container 
            sx={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: "10px",
            }}
          >
            <Button
              onClick={(e) => onClick(e, friend.id)}
              variant="contained"
              size="sm"
              sx={{ color: "primary.text" }}
              style={{fontSize: sm ? "0.7rem" : md ? "0.75rem" : lg ? "1rem" : "1.2rem"}}
            >
              Add Friend
            </Button>
          </Container>
        }
                    
    </Card>
  )
}

export default FriendCard
