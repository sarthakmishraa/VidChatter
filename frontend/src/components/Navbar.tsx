import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from 'firebase/auth';

export const Navbar = () => {
    const [user] = useAuthState(auth);

    const logOutUser = async() => {
        await signOut(auth);
    }

    return(
        <div>
            <div>
                <Link to="/">Home</Link>
                <Link to="/posts">Posts</Link>
                <Link to="/vidmeet">VidMeet</Link>
            </div>
            <div>
                {
                    user ? (
                        <button
                            onClick={logOutUser}
                        >
                            Log Out
                        </button>
                    ):(
                        <Link to="/login">Log In</Link>
                    )
                }
            </div>
        </div>
    )
}