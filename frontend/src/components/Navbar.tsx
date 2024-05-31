import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from 'firebase/auth';
import "./Navbar.css";

export const Navbar = () => {
    const [user] = useAuthState(auth);

    const logOutUser = async() => {
        await signOut(auth);
    }

    return(
        <div className="Navbar">
            <div className="NavbarLeft">
                <Link to="/"><span>Home</span></Link>
                <Link to="/posts"><span>Posts</span></Link>
                <Link to="/vidmeet"><span>VidMeet</span></Link>
            </div>
            <div className="NavbarCenter">
                <span>VidChatter</span>
                <span>Share, chat, video - all in one.</span>
            </div>
            <div className="NavbarRight">
                {
                    user ? (
                        <button
                            onClick={logOutUser}
                        >
                            Log Out
                        </button>
                    ):(
                        <Link to="/login"><button>Log In</button></Link>
                    )
                }
            </div>
        </div>
    )
}