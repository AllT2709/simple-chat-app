import "./App.css";
import { useState } from "react";
import { connect } from "socket.io-client";

import Chat from "./Chat.js";

const socket = connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="myName..."
            onChange={({ target }) => setUsername(target.value)}
          />
          <input
            type="text"
            placeholder="Room id..."
            onChange={({ target }) => setRoom(target.value)}
          />
          <button onClick={joinRoom}>Join a room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
