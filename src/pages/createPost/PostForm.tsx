import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup';
import { addDoc, collection } from "firebase/firestore"
import { auth, db } from '../../config/firebase'
import { useAuthState } from "react-firebase-hooks/auth"

interface CreateFormData {
  title : string;
  description : string;
}

function PostForm() {

  const [user] = useAuthState(auth)


  const schema = yup.object().shape({
    title : yup.string().required("Title is a Reqiuired Field"),
    description : yup.string().required("Descritption is a Required Field")

  });

  const { register, handleSubmit, formState: { errors } } = useForm<CreateFormData>({
    resolver: yupResolver(schema)
  });

  const postRef = collection(db, "posts")        


  const onCreatePost = async (data:CreateFormData) => {
    await addDoc(postRef, {
      ...data,
      username: user?.displayName,
      userId : user?.uid, 
    });
  };


  return (
    <div>
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit(onCreatePost)}>
      <div className="mb-5">
        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
        <input type="text" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Title" {...register("title")}/>
        <p style={{color:"red"}}>{errors.title?.message}</p>
      </div>
      <div className="mb-5">
        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
        <textarea id="description" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Description" {...register("description")}/>
        <p style={{color : "red"}}>{errors.description?.message}</p>
      </div>
      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
      </form>
    </div>
  )
}

export default PostForm
