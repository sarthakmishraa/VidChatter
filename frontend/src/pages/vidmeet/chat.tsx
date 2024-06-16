import { useState, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import "./chat.css";

interface chatMessagesType {
    message: string,
    roomId: string | undefined,
    userId: string
}

export const Chat = () => {
    const [messageSent, setMessageSent] = useState<string>("");
    const [chatMessages, setChatMessages] = useState<chatMessagesType[]>([]);

    const inputMessageRef = useRef<any>(null);

    const location = useLocation();
    const data = location.state;
    const name = data[0];
    const socketId = data[1];

    const { id } = useParams();
    const roomId = id?.toString()

    let flag = false;

    const sendMessage = (event: any) => {
        event.preventDefault();
        flag = true;
        const newMessage: chatMessagesType = {message: messageSent, roomId: roomId, userId: socketId}
        setChatMessages(chatMessages => [...chatMessages, newMessage]);
        inputMessageRef.current.value = "";
        setMessageSent("");
    }

    return(
        <div className="chatContainer">
            <div>
                <h1>VidTalk Chat</h1>
                <h3>Room: { id }</h3>
                <p>Hi {name}</p>
                <p>{socketId}</p>
                <form className="chatBox" onSubmit={sendMessage}>
                    <div className="chatBoxMessages">
                        {
                            chatMessages.map((messageInfo) => (
                                <p>{ messageInfo.message }</p>
                            ))
                        }
                    </div>
                    <div className="chatBoxInputBox">
                        <input
                            type="text"
                            placeholder="Type here..."
                            onChange={(event) => setMessageSent(event.target.value)}
                            ref={inputMessageRef}
                        />
                        <button type="submit">Send</button>
                    </div>
                </form>
            </div>
        </div>
    )
}