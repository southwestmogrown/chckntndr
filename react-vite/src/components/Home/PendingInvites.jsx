import { useDispatch, useSelector } from "react-redux"
import "./Home.css"
import { thunkAcceptFriend } from "../../redux/session"

function PendingInvites({availableFriends, handleClick}) {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user)
  const handleAccept = (e, friend_id) => {
    e.preventDefault()
    console.log(friend_id)
    dispatch(thunkAcceptFriend(friend_id))
  }
  return (
    <div className="pending-invites-container">
      <h2>Pending Invitations</h2>
      {sessionUser.requests.length > 0 && sessionUser.requests.map(req => (
        <div key={`${req.current_user}-${req.other_user}`} className="friend-card">
          {req.current_user === sessionUser.id && req.inviting_user !== undefined && req.approved === 0
            ?
            <>
            <h2>{availableFriends[req.inviting_user]?.username}</h2>
            <button onClick={(e) => handleAccept(e, req.inviting_user)}>Accept</button>
            <button onClick={(e) => handleClick(e, req.inviting_user)}>Decline</button>
            </>
            :
            <></>
          }
        </div>
      ))}
    </div>
  )
}

export default PendingInvites
