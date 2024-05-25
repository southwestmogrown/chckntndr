import { useSelector } from "react-redux"
import "./Home.css"

function UserFriends({ handleClick}) {
  const sessionUser = useSelector(state => state.session.user);
  const friends = useSelector(state => state.session.user.friends);

  const findApprovalForRequestsSent = (friend) => {
    const req = friend.requests.find(req => req.current_user === friend.id && req.inviting_user === sessionUser.id)
    return req.approved
  }
  return (
    friends && <div>
      <h2>Friends</h2>
      {friends.map(friend => (
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
