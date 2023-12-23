import React, { useEffect, useState } from "react";
import { Post as IPost } from "./main.tsx";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../config/firebase.ts";
import {
    addDoc,
    getDocs,
    collection,
    query,
    where,
    deleteDoc,
    doc,
} from "firebase/firestore"; /* Help to communicate with your database */

import Styles from "./post.module.css";

interface Props {
  post: IPost;
}

interface Like {
  likeId: string;
  userId: string;
}

export const Post = (props: Props) => {
    const [user] = useAuthState(auth);
    const { post } = props;

    const [postsLike, setPostsLike] = useState<Like[] | null>(null);

    const likesRef = collection(db, "likes");

    const likesDoc = query(likesRef, where("postId", "==", post.id));

    const getLikes = async () => {
        const data = await getDocs(likesDoc);
        setPostsLike(data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id })));
    };

    const hasUserLiked = postsLike?.find((like) => like.userId === user?.uid);

    const addLike = async () => {
        try {
            const newDoc = await addDoc(likesRef, { userId: user?.uid, postId: post.id });
            // To make the like action reflect immediately without needing to refresh
            if (user) {
                setPostsLike((prev) =>
                    prev
                        ? [...prev, { userId: user?.uid, likeId: newDoc.id }]
                        : [{ userId: user?.uid, likeId: newDoc.id }]
                );
            }
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    const removeLike = async () => {
        try {
            const likeToDeleteQuery = query(
                likesRef,
                where("postId", "==", post.id),
                where("userId", "==", user?.uid)
            );

            const likeToDeleteData = await getDocs(likeToDeleteQuery);
            const likeId = likeToDeleteData.docs[0].id
            const likeToDelete = doc(db, "likes", likeId);
            await deleteDoc(likeToDelete);

            // To make the like action reflect immediately without needing to refresh
            if (user) {
                setPostsLike((prev) => prev && prev.filter((like) => like.likeId !== likeId));
            }
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    useEffect(() => {
        getLikes();
    }, []);

    return (
        <div>
            <div className={Styles.title}>
                <h1> {post.title}</h1>
            </div>
            <div className={Styles.body}>
                <p> {post.description} </p>
            </div>

            <div className={Styles.footer}>
                <p> @{post.username} </p>
                <button onClick={hasUserLiked ? removeLike : addLike}>
                    {hasUserLiked ? <>&#128078;</> : <>&#128077;</>}
                </button>
                {postsLike && <p> Likes: {postsLike?.length} </p>}
            </div>
        </div>
    );
};
