import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../../config/firebase";
import { getDocs, collection } from "firebase/firestore";
import { auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Post } from "./Post";

interface postsType {
    id: string,
    title: string,
    description: string
}

export const Posts = () => {
    const [posts, setPosts] = useState<any[]>();
    const [user] = useAuthState(auth);

    useEffect(() => {
        const postsRef = collection(db, "posts");
        const fetchPosts = async() => {
            try {
                const postsData = await getDocs(postsRef);
                if (postsData) {
                    setPosts(postsData.docs as postsType|any);
                }
            }
            catch (error) {
                console.log(error);
            }
        };
        
        fetchPosts();
    }, [])

    if(!posts) {
        return(<h1>Loading...</h1>)
    }

    if(!user) {
        return(<h1>Log In to create and view posts</h1>)
    }

    return(
        <div>
            <Link to="/posts/createPost">
                <button>
                    Create a new Post
                </button>
            </Link>
            <h1>Posts:</h1>
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