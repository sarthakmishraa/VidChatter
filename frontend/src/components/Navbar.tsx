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
                <Link to="/"><button>Home</button></Link>
                <Link to="/posts"><button>VidFeed</button></Link>
                <Link to="/vidmeet"><button>VidMeet</button></Link>
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
                <a href="https://sarthakmishraa.github.io/portfolio/" target="_blank" rel="noreferrer"><button>Contact</button></a>
            </div>
        </div>
    )
}