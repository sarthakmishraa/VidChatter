import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../config/firebase";
import { addDoc, collection } from "firebase/firestore";
import { auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./createPost.css";

export const CreatePost = () => {
    const [newTitle, setNewTitle] = useState<string>("");
    const [newDescription, setNewDescription] = useState<string>("");
    const navigate = useNavigate();
    const [user] = useAuthState(auth);

    const postsRef = collection(db, "posts");

    const createNewPost = async() => {
        try {
            await addDoc(postsRef, {
                id: user?.uid,
                title: newTitle,
                description: newDescription
            });
            navigate("/posts");
        }
        catch (error) {
            console.log(error);
        }
    };

    if(!user) {
        return(<h1 className="loadingState">Log In to create and view posts</h1>)
    }

    return(
        <div className="CreatePostContainer">
            <div>
                <h2>Create a new post</h2>
                <h3>Enter title for the post: </h3>
                <input
                    type="text"
                    placeholder="Enter title"
                    onChange={(event) => setNewTitle(event.target.value)}
                    className="CreatePostTitle"
                />
            </div>
            <div>
                <h3>Enter description: </h3>
                <textarea
                    placeholder="Write here..."
                    onChange={(event) => setNewDescription(event.target.value)}
                    className="CreatePostDescription"
                />
            </div>
            <input
                type="submit"
                onClick={() => createNewPost()}
                className="CreatePostSubmitButton"
            />
        </div>
    )
}