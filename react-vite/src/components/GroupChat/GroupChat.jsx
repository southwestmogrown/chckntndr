import { useSelector } from "react-redux";
import { ChatContext } from "../../context/Chat";
import { useContext } from "react";
import Button from '@mui/material/Button'
const GroupChat = () => {
  const {messages, sendChat, chatInput, updateChatInput}= useContext(ChatContext);
  const user = useSelector(state => state.session.user)


  return (user && (
    <div>
      <div>
        {messages.map((message, ind) => (
          <div key={ind}>{`${message.user}: ${message.msg}`}</div>
        ))}
      </div>
      <form onSubmit={sendChat}>
        <input
          value={chatInput}
          onChange={updateChatInput}
        />
        <button type="submit">Send</button>
        <Button variant="contained">Hello World</Button>
      </form>
  </div> 
  ))
};


export default GroupChat;