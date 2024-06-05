import { useRef, useState, useEffect } from "react";
import * as io from "socket.io-client";
import Peer from "simple-peer";
import "./vidmeet.css"

const URL = process.env.REACT_APP_BE_URL || "http://localhost:3001";
const socket = io.connect(URL);

export const VidMeet = () => {
    const [name, setName] = useState<string>("");
    const [me, setMe] = useState<string>("");
    const [recievingCall, setRecievingCall] = useState<boolean>(false);
    const [caller, setCaller] = useState("");
    const [callerSignal, setCallerSignal] = useState("");
    const [callAccepted, setCallAccepted] = useState<boolean>(false);
    const [idToCall, setIdToCall] = useState<string>("");
    const [callEnded, setCallEnded] = useState<boolean>(false);
    const [mic, setMic] = useState<boolean>(false);
    const [isScreenSharing, setIsScreenSharing] = useState<boolean>(false);
    const [mediaStream, setMediaStream] = useState<MediaStream | undefined>();

    const localUserRef = useRef<HTMLVideoElement>(null);
    const userVideo = useRef<HTMLVideoElement>(null)
    const connectionRef = useRef<any>(null);
    const screenShareRef = useRef<any>(null);
    const remoteUserScreenShareRef = useRef<HTMLVideoElement>(null);

    const callUser = (id: string) => {
        try {
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
                    userVideo.current.srcObject = stream;
                }
            });
    
            socket.on("callAccepted", (signal) => {
                setCallAccepted(true);
                peer.signal(signal);
            });
    
            connectionRef.current = peer;
        }
        catch(error) {
            console.log(error);
        }
    };

    const answerCall = () => {
        try {
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
                if(userVideo.current) {
                    userVideo.current.srcObject = stream;
                }
            });

            peer.signal(callerSignal);

            connectionRef.current = peer;
        }
        catch(error) {
            console.log(error);
        }
    };

    const leaveCall = () => {
        try {
            setCallEnded(true);
            setIdToCall("");
            connectionRef.current?.destroy();

            mediaStream?.getTracks().forEach(track => track.stop());
            setMediaStream(undefined);

            if (localUserRef.current) {
                localUserRef.current.srcObject = null;
            }
            if (userVideo.current) {
                userVideo.current.srcObject = null;
            }
            setCallAccepted(false);
            setRecievingCall(false);
            setCaller("");
            setCallerSignal("");
        }
        catch(error) {
            console.log(error);
        }
    };

    const shareScreen = async () => {
        try {
            setIsScreenSharing(true);
            const screenStream = await navigator.mediaDevices.getDisplayMedia({
                // @ts-ignore
                video: { cursor: "always" },
                audio: true
            });

            if(screenShareRef.current) {
                screenShareRef.current.srcObject = screenStream;
            }

            const peer = new Peer({
                initiator: true,
                trickle: false,
                stream: screenStream
            });

            peer.on("signal", (data) => {
                socket.emit("screenShare", {
                    signalData: data,
                    from: me,
                    name: name
                });
            });

            socket.on("screenShared", (signal) => {
                peer.signal(signal);
            });

            screenShareRef.current = peer;
        } catch (error) {
            console.error("Error in shareScreen:", error);
        }
    };

    const stopScreenShare = () => {
        try {
            if(screenShareRef.current) {
                screenShareRef.current.srcObject = null;
            }
            setIsScreenSharing(false)
        }
        catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const getMedia = async() => {
            try {
                const stream = await window.navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: mic
                });

                setMediaStream(stream);

                socket.on("me", (id) => {
                    setMe(id);
                });

                setMe(socket.id as string);

                socket.on("callUser", (data) => {
                    setRecievingCall(true);
                    setCaller(data.from);
                    setName(data.name);
                    setCallerSignal(data.signal);
                });

                if(localUserRef.current) {
                    localUserRef.current.srcObject = stream;
                }
            }
            catch(error) {
                console.log(error);
            }
        };

        getMedia();

    }, [mic]);

    return(
        <div className="vidmeetContainer">
            <div>
                <h1>VidMeet (under progress)</h1>
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
            </div>

            <div className="vidmeetScreenStream">
                {
                    isScreenSharing &&
                    <video
                        ref={screenShareRef}
                        autoPlay
                    />
                }
            </div>
            
            {recievingCall && !callAccepted ? (
                <div>
                    <h2>{name} is calling...</h2>
                    <button onClick={answerCall}>Answer CALL</button>
                </div>
            ):(null)}

            <div className="vidmeetVideoStream">
                {
                    mediaStream &&
                    <video
                        ref={localUserRef}
                        autoPlay
                    />
                }
                {
                    callAccepted && !callEnded ?
                    (
                        <video
                            playsInline
                            ref={userVideo}
                            autoPlay
                        />
                    ):(null)
                }
            </div>
            <button
                onClick={() => setMic(!mic)}
            >
                {mic ? <span>Turn Mic Off</span>:<span>Turn Mic On</span>}
            </button>
            <button
                onClick={shareScreen}
            >
                Share Screen
            </button>
            <button
                onClick={stopScreenShare}
            >
                Stop sharing
            </button>
        </div>
    )
}