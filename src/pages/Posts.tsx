import React, { useEffect, useState } from 'react'
import { getDocs, collection} from 'firebase/firestore'
import { db } from '../config/firebase'
import PostCard from '../components/PostCard';



export interface PostInterface {
    id: string;
    userId : string;
    title : string;
    description : string;
    username : string;
  }

function Posts() {
    const [postList, setPostList] = useState<PostInterface[] | null>(null)
    const postRef = collection(db, "posts")   

    const getAllPost = async () => {
        const postData = await getDocs(postRef)
        const postDataResponse = postData.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
        }))
        console.log(postDataResponse)
        setPostList(postDataResponse as PostInterface[])
    };


    useEffect(() => {
      getAllPost();

    }, [])


  return (
    <div>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Posts Page</h1>
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">  
        {postList?.map((post) => (
          <PostCard post={post}/>
        ))}
    </div>
  </div>
</section>

    </div>
  )
}

export default Posts
