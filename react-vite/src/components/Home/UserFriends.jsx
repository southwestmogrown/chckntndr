import { useSelector } from "react-redux"
import "./Home.css"

function UserFriends({ handleClick}) {
  const sessionUser = useSelector(state => state.session.user);

  const findApprovalForRequestsSent = (friend) => {
    console.log(friend)
    const req = friend.requests.find(req => req.current_user === friend.id && req.inviting_user === sessionUser.id)
    console.log(req)
    return req.approved
  }
  return (
    <div>
      <h2>Friends</h2>
      {sessionUser.friends.map(friend => (
        <div key={friend.id} className="friend-card">
          { findApprovalForRequestsSent(friend) !== 0 &&
            <>
              <h2>{friend.username}</h2>
              <button>Add to Party</button>
              <button onClick={(e) => handleClick(e, friend.id)}>Remove Friend</button>
            </>
          }
        </div>
      ))}
    </div>
  )
}

export default UserFriends
