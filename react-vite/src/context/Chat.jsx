import { createContext, useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { io } from 'socket.io-client';

export const ChatContext = createContext();

export const useChatContext = () => useContext(ChatContext)

let socket;

export default function ChatProvider(props) {
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([]);
  const user = useSelector(state => state.session?.user);

  useEffect(() => {
    // open socket connection
    // create websocket
    socket = io("localhost:8000/", {
      transports: ["websocket"],
      cors: {
        origin: "http://localhost:5173/",
      }
    })

    
    socket.on("chat", (chat) => {
      setMessages(messages => [...messages, chat])
    })
    // when component unmounts, disconnect
    return (() => {
      socket.disconnect()
    })
  }, [])

  const updateChatInput = (e) => {
    setChatInput(e.target.value)
  };

  const sendChat = (e) => {
    e.preventDefault()
    socket.emit("chat", { user: user.username, msg: chatInput });
    setChatInput("")
  }

  return (
    <ChatContext.Provider value={{ messages, sendChat, chatInput, updateChatInput}}>
      {props.children}
    </ChatContext.Provider>
  )
}