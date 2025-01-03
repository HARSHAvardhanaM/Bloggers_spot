import React from 'react'
import service from '../appwrite/config'
import {Link} from "react-router-dom"

function PostCard({$id,title,featuredImage}) {
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full hover:opacity-80 hover:decoration-gray-100 bg-card-bg rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img className='h-32 w-full' src={service.getFilePreview(featuredImage)} alt={title} />
            </div>
            <h2 className='text-xl font-bold'>{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard
