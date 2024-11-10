import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../../config/firebase";
import { getDocs, collection } from "firebase/firestore";
import { auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Post } from "./Post";
import "./post.css";

export interface postType {
    id: string,
    username: string,
    title: string,
    description: string
}

export const VidFeed = () => {
    const [posts, setPosts] = useState<postType[] | undefined>();
    const [user] = useAuthState(auth);

    const navigate = useNavigate();

    useEffect(() => {
        const postsRef = collection(db, "posts");
        const fetchPosts = async() => {
            try {
                const postsData = await getDocs(postsRef);
                if (postsData) {
                    setPosts(postsData.docs as any);
                }
            }
            catch (error) {
                console.log(error);
            }
        };
        
        fetchPosts();
    }, [])

    if(!posts) {
        return(<h1 className="LoadingState">Loading...</h1>)
    }

    if(!user) {
        navigate("/login");
    }

    return(
        <div className="Posts">
            <div className="CreatePostButton">
            <Link
                to="/posts/createPost"
            >
                <button>
                    Create a new Post
                </button>
            </Link>
            </div>
            {
                posts?.map((post) => (
                    <div>
                        <Post post={post} />
                    </div>
                ))
            }
        </div>
    )
};