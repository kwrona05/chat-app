import { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io(/*url backend*/);
function App() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const sendMessage = () => {
    if (inputValue) {
      socket.emit("message", inputValue);
      setInputValue("");
    }
  };

  return (
    <div>
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input type='text' value={inputValue} onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={}
    </div>
  );
}
