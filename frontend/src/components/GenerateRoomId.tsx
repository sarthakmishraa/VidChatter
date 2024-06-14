import { useState } from "react";
import "./GenerateRoomId.css"

export const GenerateRoomId = () => {
    const [roomId, setRoomId] = useState<string>("");

    const generateRandomId = () => {
        let tempId = "";
        const chars = "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
        const length = 4;
        
        for(let i=0; i<length; i++) {
            const index = Math.floor(Math.random() * chars.length);
            tempId += chars[index];
        }
        setRoomId(tempId);
    }
    
    return(
        <div className="generateRoomIdContainer">
                <div>
                    <h1>OR</h1>
                </div>
                <div>
                    <button onClick={generateRandomId}>Generate Room ID</button>
                    <h3>{ roomId }</h3>
                </div>
        </div>
    )
}