import { Link } from "react-router-dom";

import "./home.css";
import { HomeFeatures } from "../components/HomeFeatures";

export const Home = () => {
    return(
        <div className="container">
            <div className="hero">
                <div className="homeTitle">
                    <span className="homeHeading">VidChatter</span>
                    <span className="homeTagline">Share, chat, video - all in one.</span>
                    <p className="homeBodyText">VidChatter leverages modern web technologies to provide a smooth, efficient, and engaging user experience. Whether it's sharing posts, chatting in real-time, or connecting via video calls, VidChatter aims to be your go-to platform for social interaction.</p>
                </div>
                <div className="homeActions">
                    <Link to="/posts"><button>VidFeed</button></Link>
                    <Link to="/vidmeet"><button>VidMeet</button></Link>
                </div>
            </div>
            <HomeFeatures />
        </div>
    )
};