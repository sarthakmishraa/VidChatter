import { Link } from "react-router-dom";
import { FaLinkedin, FaGithubSquare } from "react-icons/fa";
import { ImProfile } from "react-icons/im";

import "./Footer.css"

export const Footer = () => {
    return(
        <div className="Footer">
            <div className="FooterAppName">
                <span>VidChatter</span>
                <span>Share, chat, video - all in one.</span>
            </div>
            <div className="FooterProjectsInfo">
                <span className="FooterSubHeading">My Other Projects</span>
                <div className="FooterProjectInfo">
                    <span>SM Chat App</span>
                    <span>
                        <Link
                            to="https://sm-chatapp.netlify.app/"
                            target="_blank"
                            >
                            Live
                        </Link>
                    </span>
                    <span>
                        <Link
                            to="https://github.com/sarthakmishraa/sm-chat-app"
                            target="_blank"
                            >
                            Code
                        </Link>
                    </span>
                </div>
                <div className="FooterProjectInfo">
                    <span>Trip Script</span>
                    <span>
                        <Link
                            to="https://tripscript.netlify.app/"
                            target="_blank"
                            >
                            Live
                        </Link>
                    </span>
                    <span>
                        <Link
                            to="https://github.com/sarthakmishraa/trip-script"
                            target="_blank"
                            >
                            Code
                        </Link>
                    </span>
                </div>
                <div className="FooterProjectInfo">
                    <span>SM Security</span>
                    <span>
                        <Link
                            to="https://smsec.netlify.app/"
                            target="_blank"
                            >
                            Live
                        </Link>
                    </span>
                    <span>
                        <Link
                            to="https://github.com/sarthakmishraa/SM_SEC"
                            target="_blank"
                            >
                            Code
                        </Link>
                    </span>
                </div>
            </div>
            <div className="FooterContact">
                <p className="FooterSubHeading">Contact Us</p>
                <div className="FooterContactIcons">
                    <div className="FooterContactIcon">
                        <Link
                            to="https://www.linkedin.com/in/sarthakmishraa/"
                            target="_blank"
                        >
                            <FaLinkedin size={ 34 } />
                        </Link>
                    </div>
                    <div className="FooterContactIcon">
                        <Link
                            to="https://sarthakmishraa.github.io/portfolio/"
                            target="_blank"
                        >
                            <ImProfile size={ 30 } />
                        </Link>
                    </div>
                    <div className="FooterContactIcon">
                        <Link
                            to="https://github.com/sarthakmishraa"
                            target="_blank"
                        >
                            <FaGithubSquare size={ 34 } />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}