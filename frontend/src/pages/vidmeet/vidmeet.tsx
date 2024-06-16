import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as io from "socket.io-client";
import { GenerateRoomId } from "../../components/GenerateRoomId";
import "./vidmeet.css";

const URL = process.env.REACT_APP_BE_URL || "http://localhost:3001";
const socket = io.connect(URL);

export const VidMeet = () => {
    const [name, setName] = useState<string>("");
    const [roomId, setRoomId] = useState<string>("");

    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate("/vidmeet/room/" + roomId, { state: [name, socket.id] }); 
    };

    return(
        <div className="container">
            <h1>VidMeet</h1>
            <div className="vidmeetContainer">
                <form onSubmit={handleSubmit} className="vidmeetForm">
                    <input
                        type="text"
                        onChange={(event) => setName(event.target.value)}
                        placeholder="Enter your name"
                        required
                    />
                    <input
                        type="text"
                        onChange={(event) => setRoomId(event.target.value)}
                        placeholder="Enter room id"
                        required
                    />
                    <button type="submit">
                        Chat
                    </button>
                </form>
                <GenerateRoomId />
            </div>
        </div>
    )
}