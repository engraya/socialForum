import React, { useEffect, useState } from 'react'
import { PostInterface } from '../pages/Posts'
import { db } from '../config/firebase'
import { addDoc, collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore"
import { auth } from '../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { FcLike } from "react-icons/fc";
import { IoMdHeartDislike } from "react-icons/io";


interface Props {
    post: PostInterface
}


interface Like {
    likeId: string;
    userId : string;
}

function PostCard(props : Props) {
    const { post } = props
    const [user] = useAuthState(auth);

    const [likes, setLikes] = useState<Like[] | null >(null)


    const likesRef = collection(db, "likes");
    const likesDoc = query(likesRef, where("postId", "==", post.id))

    const getLikes = async () => {
        const likesData = await getDocs(likesDoc)
        const likeDocResponse = likesData.docs.map((doc) => ({ userId : doc.data().userId, likeId: doc.id }))
        console.log(likeDocResponse)
        setLikes(likeDocResponse)

    };

    const hasUserLiked = likes?.find((like) => like.userId === user?.uid)

    useEffect(() => {
        getLikes();
    }, [])

    const onPostLike = async () => {
        try {
            const newDoc = await addDoc(likesRef, {
                likedByUserId : user?.uid, 
                postId : post.id
              });
              if (user) {
                setLikes((prev) => 
                prev ? [...prev, { userId : user?.uid, likeId : newDoc.id}] : [{ userId : user?.uid,  likeId : newDoc.id}]
              )
            };
        } catch (error) {
            console.log(error)
        }
      }

      const onPostUnLike = async () => {
        try {
            const likeToDeleteQuery = query(likesRef, where("postId", "==", post.id), where("likedByUserId", "==", user?.uid))
            const likeToDeleteData = await getDocs(likeToDeleteQuery);
            const likeId = likeToDeleteData.docs[0].id
            const docToDelete = doc(db, "likes", likeId)
            await deleteDoc(docToDelete)
              if (user) {
                setLikes((prev) => prev && prev.filter((like) => like.likeId !== likeId)
              )
            };
        } catch (error) {
            console.log(error)
        }
      }




  return (
    <div>
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-end px-4 pt-4">
        </div>
        <div className="flex flex-col items-center pb-10">
        <figure className="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-ss-lg md:border-e dark:bg-gray-800 dark:border-gray-700">
            <blockquote className="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{post.title}</h3>
                <p className="my-4">{post.description}</p>
                            <button type="button" onClick={hasUserLiked ? onPostUnLike : onPostLike} className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500">
                           {hasUserLiked ? <IoMdHeartDislike /> : <FcLike />}
                            </button>
            </blockquote>
            {likes && <p><FcLike />{likes.length}</p>}
            <figcaption className="flex items-center justify-center ">
                {/* <img className="rounded-full w-9 h-9" src=""  alt="profile picture" /> */}
                <div className="space-y-0.5 font-medium dark:text-white text-left rtl:text-right ms-3">
                <div>@ {post.username}</div>
                </div>
            </figcaption>    
        </figure>
        </div>
    </div>
    </div>
  )
}

export default PostCard
