import { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { getDocs, deleteDoc, addDoc, doc, collection, query, where } from "firebase/firestore";

interface likesType {
    likeId: string,
    userId: string
}

interface commentsType {
    commentId: string,
    userId: string | undefined,
    comment: string
}

export const Post = (props: any) => {
    const { post } = props;
    const [likes, setLikes] = useState<likesType[]>([]);
    const [comments, setComments] = useState<commentsType[]>([]);
    const [commentText, setCommentText] = useState<string>("");
    const [user] = useAuthState(auth);
    const commentBoxRef = useRef<HTMLInputElement | null>(null);

    const likesRef = collection(db, "likes");
    const likesDoc = query(likesRef, where("postId", "==", post.id));

    const commentRef = collection(db, "comments");

    const deletePost = async(postId: string) => {
        const deleteRef = doc(db, "posts", postId);
        await deleteDoc(deleteRef);
        window.location.reload();
    };

    // Like feature

    const getLikes = async() => {
        const likesData = await getDocs(likesDoc);
        const likesList = likesData.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id }));
        setLikes(likesList);
    };

    const addLike = async() => {
        try {
            const newDoc = await addDoc(likesRef, {
                userId: user?.uid,
                postId: post.id
            });
            if(user) {
                setLikes((prev: likesType[]) => prev ? [...prev, { userId: user.uid || "", likeId: newDoc.id }] : [{ userId: user.displayName || "", likeId: newDoc.id }])
            }
        }
        catch(error) {
            console.log(error);
        }
    };

    const removeLike = async() => {
        try {
            const likeToDeleteQuery = query(likesRef, where("postId", "==", post.id), where("userId", "==", user?.uid));
            const likeToDeleteData = await getDocs(likeToDeleteQuery);
            const likeId = likeToDeleteData.docs[0].id;
            const likeToDelete = doc(db, "likes", likeId);
            await deleteDoc(likeToDelete);

            if(user) {
                setLikes((prev) => prev && prev.filter((like) => like.likeId !== likeId));
            }
        }
        catch(error) {
            console.log(error);
        }
    }

    const isLiked = likes.some((like: likesType) => like.userId === user?.uid);

    // Comment feature

    const getComments = async() => {
        const commentsQuery = query(commentRef, where("postId", "==", post.id));
        const commentsData = await getDocs(commentsQuery);
        const commentsList = commentsData.docs.map((doc) => ({ userId: user?.uid, commentId: doc.id, comment: doc.data().comment }));
        setComments(commentsList);
    };

    const addComment = async() => {
        try {
            const newCommentDoc = await addDoc(commentRef, {
                userId: user?.uid,
                postId: post.id,
                comment: commentText
            });

            setComments((prev) => prev ?
                [...prev, { userId: user?.uid, commentId: newCommentDoc.id, comment: commentText }] 
            : [{ userId: user?.uid, commentId: newCommentDoc.id, comment: commentText }]);
            if(commentBoxRef.current != null){
                commentBoxRef.current.value = "";
            }
        }
        catch(error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getLikes();
        getComments();
    }, []);

    return(
        <div>
            <h2>{ post.data().title }</h2>
            <h3>{ post.data().description }</h3>
            <h3>Author: { user?.displayName }</h3>
            <h3>Likes: { likes.length }</h3>
            <div>
                <h3>Comments:</h3>
                <input
                    type='text'
                    placeholder='Write comment here...'
                    onChange={(event) => setCommentText(event.target.value)}
                    ref={commentBoxRef}
                />
                <button
                    onClick={addComment}
                >
                    Comment
                </button>
                {
                    comments.map((comment) => comment.comment)
                }
            </div>
            {isLiked ? (
                <button
                    onClick={removeLike}
                >
                    Remove Like
                </button>
            ):(
                <button
                    onClick={addLike}
                >
                    Like
                </button>
            )}
            {
                user?.uid === post.data().id &&
                <div>
                    <Link
                        to="/posts/editPost"
                        state={post.id}
                    >
                        <button>
                            Edit
                        </button>
                    </Link>
                    <button onClick={() => deletePost(post.id)}>Delete</button>
                </div>
            }
            <hr/>
        </div>
    )
}