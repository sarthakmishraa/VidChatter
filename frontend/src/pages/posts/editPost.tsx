import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { db } from "../../config/firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { postType } from "./posts";

export const EditPost = () => {
    const [newTitle, setNewTitle] = useState<string>("");
    const [newDescription, setNewDescription] = useState<string>("");
    const location = useLocation();
    const navigate = useNavigate();
    const postId = location.state;

    const handleChanges = async(newTitle: string, newDescription: string) => {
        const postsRef = collection(db, "posts");
        const posts:any = await getDocs(postsRef);
        const post = posts.docs.find((post: postType) => post.id === postId).data();
        
        if(post) {
            const postRef = doc(db, "posts", postId);
            await updateDoc(postRef, {
                title: newTitle,
                description: newDescription
            });
            navigate("/posts");
        }
        else {
            console.log("Post not found");
        }
    }

    useEffect(() => {
        const getPost = async() => {
            const postsRef = collection(db, "posts");
            const posts:any = await getDocs(postsRef);
            setNewTitle(posts.docs.find((post: postType) => post.id === postId).data().title);
            setNewDescription(posts.docs.find((post: postType) => post.id === postId).data().description);
        };

        getPost();
    }, [postId]);
    
    return(
        <div>
            <h2>Edit Post</h2>
            <input
                type="text"
                placeholder="Title"
                onChange={(event) => setNewTitle(event.target.value)}
                value={newTitle}
            />
            <input
                type="text"
                placeholder="Description"
                onChange={(event) => setNewDescription(event.target.value)}
                value={newDescription}
            />
            <button onClick={() => handleChanges(newTitle, newDescription)}>Make changes</button>
        </div>
    )
};