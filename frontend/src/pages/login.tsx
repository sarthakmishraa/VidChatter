import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../config/firebase";

export const Login = () => {
    const navigate = useNavigate();

    const signInWithGoogle = async() => {
        await signInWithPopup(auth, provider);
        navigate("/posts");
    };

    return(
        <div>
            <button
                onClick={signInWithGoogle}
            >
                Sign In with Google
            </button>
        </div>
    )
};