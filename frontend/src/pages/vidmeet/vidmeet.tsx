import { useRef, useState, useEffect } from "react";
import * as io from "socket.io-client";
import Peer from "simple-peer";

const URL = "http://localhost:3001";
const socket = io.connect(URL);

export const VidMeet = () => {
    const [name, setName] = useState<string>("");
    const [me, setMe] = useState<string>("");
    const [recievingCall, setRecievingCall] = useState<boolean>(false);
    const [caller, setCaller] = useState("");
    const [callerSignal, setCallerSignal] = useState("");
    const [callAccepted, setCallAccepted] = useState<boolean>(false);
    const [idToCall, setIdToCall] = useState("");
    const [callEnded, setCallEnded] = useState<boolean>(false);
    const [mic, setMic] = useState<boolean>(true);
    const [mediaStream, setMediaStream] = useState<MediaStream | undefined>();

    const localUserRef = useRef<HTMLVideoElement>(null);
    const userVideo = useRef<HTMLVideoElement>(null)
    const connectionRef = useRef();

    const callUser = (id: string) => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: mediaStream
        });

        peer.on("signal", (data) => {
            socket.emit("callUser", {
                userToCall: id,
                signalData: data,
                from: me,
                name: name
            })
        });

        peer.on("stream", (stream) => {
            if(userVideo.current) {
                // @ts-ignore
                userVideo.current.srcObject = stream;
            }
        });

        socket.on("callAccepted", (signal) => {
            setCallAccepted(true);
            peer.signal(signal);
        });

        // @ts-ignore
        connectionRef.current = peer;
    };

    const answerCall = () => {
        setCallAccepted(true);
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: mediaStream
        });

        peer.on("signal", (data) => {
            socket.emit("answerCall", {signal: data, to: caller})
        })

        peer.on("stream", (stream) => {
            // @ts-ignore
            userVideo.current.srcObject = stream;
        });

        peer.signal(callerSignal);

        // @ts-ignore
        connectionRef.current = peer;
    };

    const leaveCall = () => {
        setCallEnded(true);
        // @ts-ignore
        connectionRef.current.destroy();
    };

    useEffect(() => {
        const getMedia = async() => {
            try {
                const stream = await window.navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: mic
                });

                setMediaStream(stream);

                // @ts-ignore
                localUserRef.current.srcObject = stream;

                socket.on("me", (id) => {
                    setMe(id);
                });

                socket.on("callUser", (data) => {
                    setRecievingCall(true);
                    setCaller(data.from);
                    setName(data.name);
                    setCallerSignal(data.signal);
                });
            }
            catch(error) {
                console.log(error);
            }
        };

        getMedia();

    }, [mic]);

    return(
        <div>
            <h1>VidMeet</h1>
            {
                mediaStream &&
                <video
                    ref={localUserRef}
                    autoPlay
                    width={300}
                    height={250}
                />
            }
            {
                callAccepted && !callEnded ?
                (
                    <video
                        playsInline
                        ref={userVideo}
                        autoPlay
                        width={600}
                        height={500}
                    />
                ):(null)
            }
            <button
                onClick={() => setMic(!mic)}
            >
                {mic ? <h4>Turn Mic Off</h4>:<h4>Turn Mic On</h4>}
            </button>

            <input
                type="text"
                placeholder="Enter your name"
                onChange={(event) => setName(event.target.value)}
            />
            
            <h1>My ID: {me}</h1>

            <input
                placeholder="set id to call"
                value={idToCall}
                onChange={(event) => setIdToCall(event.target.value)}
            />
            
            {callAccepted && !callEnded ? (
                <button onClick={leaveCall}>END CALL</button>
            ):(
                <button onClick={() => callUser(idToCall)}>CALL</button>
            )}
            
            {recievingCall && !callAccepted ? (
                <div>
                    <h2>{name} is calling...</h2>
                    <button onClick={answerCall}>Answer CALL</button>
                </div>
            ):(null)}
            
        </div>
    )
}