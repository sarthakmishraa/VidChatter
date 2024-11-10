import { MdArticle } from "react-icons/md";
import { BsChatRightDotsFill } from "react-icons/bs";
import { RiVideoChatFill } from "react-icons/ri";

import "./HomeFeatures.css";

export const HomeFeatures = () => {
    return(
        <div className="featuresContainer">
            <p className="featuresHeading">Key Features</p>
            <div className="features">
                <div className="feature">
                    <MdArticle className="featureIcon" size={ 52 } />
                    <span className="featureTitle">Posts</span>
                    <span className="featureTagline">Share your thoughts & engage with community.</span>
                </div>
                <div className="feature">
                    <BsChatRightDotsFill className="featureIcon" size={ 48 } />
                    <span className="featureTitle">VidTalk</span>
                    <span className="featureTagline">Real-time chat & real-time connections.</span>
                </div>
                <div className="feature">
                    <RiVideoChatFill className="featureIcon" size={ 54 } />
                    <span className="featureTitle">VidCall</span>
                    <span className="featureTagline">Face-to-face, anytime, anywhere.</span>
                </div>
            </div>
        </div>
    )
}