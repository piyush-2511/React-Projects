import React from 'react'
import appwriteService from '../appwrite/config'
import { Link } from 'react-router-dom'

function PostCard({ post }) {
  const { $id, title, featuredImage, content } = post

  const plainText = content.replace(/<[^>]+>/g, '')
  const shortText = plainText.length > 100 ? plainText.slice(0, 100) + '...' : plainText

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition duration-200 flex flex-col h-full shadow-lg">
        <div className="w-full h-48 overflow-hidden rounded-lg mb-4">
          <img
            src={appwriteService.getFileView(featuredImage)}
            alt={title}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
        <h2 className="text-lg font-semibold text-gray-800">
          {title.length > 20 ? title.slice(0, 20) + '...' : title}
        </h2>
        <p className="text-sm text-gray-600 mt-2">{shortText}</p>
      </div>
    </Link>
  )
}

export default PostCard
