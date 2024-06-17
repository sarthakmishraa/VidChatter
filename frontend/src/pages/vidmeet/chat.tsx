import { useState, useEffect, useRef } from "react";
import * as io from "socket.io-client";
import { useParams, useLocation } from "react-router-dom";
import "./chat.css";

interface chatMessagesType {
    message: string,
    roomId: string | undefined,
    userId: string | undefined,
    time: string,
}

const URL = process.env.REACT_APP_BE_URL || "http://localhost:3001";
const socket = io.connect(URL);

const getCurrentTime = () => {
    const currTime = new Date();
    let hrs = currTime.getHours();
    let mins = currTime.getMinutes();
    let ampm = hrs >= 12 ? "PM" : "AM";

    let formattedhrs = hrs % 12;
    formattedhrs = formattedhrs ? formattedhrs : 12;
    let formattedmins = mins < 10 ? "0" + mins : mins;
    let currTimeString = `${formattedhrs}:${formattedmins} ${ampm}`;

    return currTimeString;
}

export const Chat = () => {
    const [messageSent, setMessageSent] = useState<string>("");
    const [chatMessages, setChatMessages] = useState<chatMessagesType[]>([]);

    const inputMessageRef = useRef<any>(null);

    const location = useLocation();
    const data = location.state;
    const name = data.name;
    const socketId = socket.id;

    const currTime = getCurrentTime();

    const { id } = useParams();
    const roomId = id?.toString()

    const sendMessage = (event: any) => {
        event.preventDefault();
        if(messageSent !== "") {
            socket.emit("sendMessage", { message: messageSent, roomId: roomId, userId: socketId, time: currTime });
            const newMessage: chatMessagesType = {message: messageSent, roomId: roomId, userId: socketId, time: currTime}
            setChatMessages(chatMessages => [...chatMessages, newMessage]);
            inputMessageRef.current.value = "";
            setMessageSent("");
        }
    };

    useEffect(() => {
        if (roomId) {
            socket.emit("joinRoom", roomId);
        }
    }, [roomId]);

    useEffect(() => {
        socket.on("receivedMessage", (data: chatMessagesType) => {
            console.log(data.time);
            setChatMessages(chatMessages => [...chatMessages, data]);
        });
    }, [socket]);

    return(
        <div className="chatContainer">
            <div>
                <h1>VidTalk</h1>
                <h3>Room: { id }</h3>
                <h3>Hi {name}</h3>
                <form className="chatBox" onSubmit={sendMessage}>
                    <div className="chatBoxMessagesContainer">
                        {
                            chatMessages.map((messageInfo) => (
                                messageInfo.userId === socketId ? (
                                    <div className="chatBoxMessages">
                                        <p>{ messageInfo.message }</p>
                                        <span>{ messageInfo.time }</span>
                                    </div>
                                ):(
                                    <div className="chatBoxMessagesReciever">
                                        <p>{ messageInfo.message }</p>
                                        <span>{ messageInfo.time }</span>
                                    </div>
                                )
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