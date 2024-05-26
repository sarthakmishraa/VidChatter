import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../config/firebase";
import { addDoc, collection } from "firebase/firestore";
import { auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

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
        return(<h1>Log In to create and view posts</h1>)
    }

    return(
        <div>
            <h2>Create a new post</h2>
            <h3>Enter title for the post: </h3>
            <input
                type="text"
                placeholder="Enter title"
                onChange={(event) => setNewTitle(event.target.value)}
            />
            <h3>Enter description: </h3>
            <input
                type="text"
                placeholder="Enter description"
                onChange={(event) => setNewDescription(event.target.value)}
            />
            <input
                type="submit"
                onClick={() => createNewPost()}
            />
        </div>
    )
}