import { useState, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import "./chat.css";

export const Chat = () => {
    const [message, setMessage] = useState<string>("");
    const [chatMessages, setChatMessages] = useState<string[]>([]);
    const inputMessageRef = useRef<any>(null);
    const location = useLocation();
    const data = location.state;
    const name = data[0]
    const socketId = data[1]
    const { id } = useParams();

    let flag = false;

    const sendMessage = (event: any) => {
        event.preventDefault();
        flag = true;
        inputMessageRef.current.value = "";
        setMessage("");
    }

    return(
        <div className="chatContainer">
            <div>
                <h1>VidTalk Chat</h1>
                <h3>Room: { id }</h3>
                <p>Hi {name}</p>
                <p>{socketId}</p>
                <form className="chatBox" onSubmit={sendMessage}>
                    {
                        chatMessages
                    }
                    <input
                        type="text"
                        placeholder="Type here..."
                        onChange={(event) => setMessage(event.target.value)}
                        ref={inputMessageRef}
                    />
                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    )
}