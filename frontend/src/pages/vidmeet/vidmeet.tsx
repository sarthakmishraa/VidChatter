import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GenerateRoomId } from "../../components/GenerateRoomId";
import "./vidmeet.css";

export const VidMeet = () => {
    const [name, setName] = useState<string>("");
    const [roomId, setRoomId] = useState<string>("");

    const navigate = useNavigate();

    const handleSubmit = (event: any) => {
        event.preventDefault();
        navigate(`/vidmeet/room/${roomId}`, { state: { name } });
    };

    return(
        <>
            <div className="container">
                <h1>VidTalk</h1>
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
            <hr className="lineBreak" />
            <div className="container">
                <h1>VidCall - 1 on 1 video conferencing</h1>
                <h3>(under development)</h3>
            </div>
        </>
    )
}