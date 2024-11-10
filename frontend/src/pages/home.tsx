import "./home.css";
import { Link } from "react-router-dom";

export const Home = () => {
    return(
        <div className="container">
            <div className="homeTitle">
                <span className="homeHeading">VidChatter</span>
                <span className="homeTagline">Share, chat, video - all in one.</span>
                <p className="homeBodyText">VidChatter leverages modern web technologies to provide a smooth, efficient, and engaging user experience. Whether it's sharing posts, chatting in real-time, or connecting via video calls, VidChatter aims to be your go-to platform for social interaction.</p>
            </div>
            <div className="homeActions">
                <Link to="/posts"><button>Posts</button></Link>
                <Link to="/vidmeet"><button>VidMeet</button></Link>
            </div>
        </div>
    )
};