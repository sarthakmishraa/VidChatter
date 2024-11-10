import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../config/firebase";

import "./login.css";

export const Login = () => {
    const navigate = useNavigate();

    const signInWithGoogle = async() => {
        await signInWithPopup(auth, provider);
        navigate("/posts");
    };

    return(
        <div className="LoginContainer">
            <div>
                <p className="BodyText">Sign in to VidChatter connect and share with the people in your life.</p>
                <button
                    onClick={signInWithGoogle}
                >
                    Sign In with Google
                </button>
            </div>
        </div>
    )
};