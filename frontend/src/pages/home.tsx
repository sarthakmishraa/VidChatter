import { Link } from "react-router-dom";
import { MdArticle } from "react-icons/md";
import { BsChatRightDotsFill } from "react-icons/bs";
import { RiVideoChatFill } from "react-icons/ri";

import "./home.css";

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
                    <Link to="/posts"><button>Posts</button></Link>
                    <Link to="/vidmeet"><button>VidMeet</button></Link>
                </div>
            </div>
            <div className="featuresContainer">
                <p className="featuresHeading">Key Features</p>
                <div className="features">
                    <div className="feature">
                        <MdArticle className="featureIcon" size={ 44 } />
                        <span className="featureTitle">Posts</span>
                        <span className="featureTagline">Share your thoughts.</span>
                    </div>
                    <div className="feature">
                        <BsChatRightDotsFill className="featureIcon" size={ 40 } />
                        <span className="featureTitle">VidTalk</span>
                        <span className="featureTagline">Real-time chat & connections.</span>
                    </div>
                    <div className="feature">
                        <RiVideoChatFill className="featureIcon" size={ 48 } />
                        <span className="featureTitle">VidCall</span>
                        <span className="featureTagline">Face-to-face, anytime, anywhere.</span>
                    </div>
                </div>
            </div>
        </div>
    )
};