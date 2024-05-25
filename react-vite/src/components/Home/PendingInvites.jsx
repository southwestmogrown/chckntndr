import { useDispatch, useSelector } from "react-redux"
import "./Home.css"
import { thunkAcceptFriend } from "../../redux/session"

function PendingInvites({ handleClick }) {
  const dispatch = useDispatch()
  const pendingInvites = useSelector(state => state.session.pendingInvites)
  const pendingArr = Object.values(pendingInvites)

  const handleAccept = (e, friend_id) => {
    e.preventDefault()
    console.log(friend_id)
    dispatch(thunkAcceptFriend(friend_id))
  }

  return (
    <div className="pending-invites-container">
      <h2>Pending Invitations</h2>
      {pendingArr.length > 0 && pendingArr.map(friend => (
        <div key={friend.id} className="friend-card">
            <>
            <h2>{friend.username}</h2>
            <button onClick={(e) => handleAccept(e, friend.id)}>Accept</button>
            <button onClick={(e) => handleClick(e, friend.id)}>Decline</button>
            </>
        </div>
      ))}
    </div>
  )
}

export default PendingInvites
