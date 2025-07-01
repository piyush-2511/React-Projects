import React, { useState, useEffect } from 'react'
import appwriteService from '../appwrite/config'
import { PostCard } from '../Components'
import { Container } from '../Components/index'

function AllPost() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await appwriteService.getPost([])
      if (posts) setPosts(posts.documents)
    }

    fetchPosts()
  }, [])

  return (
    <div className="w-full py-8">
      <Container>
      <div className='flex flex-wrap -mx-2'>
        {posts.map(post => (
          <div key={post.$id} className='p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4'>
            <PostCard post={post} />
          </div>
        ))}
      </div>

      </Container>
    </div>
  )
}

export default AllPost
