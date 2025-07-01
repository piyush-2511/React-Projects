import React, {useEffect, useState} from 'react'
import appwriteService from '../appwrite/config'
import { Container, PostCard } from '../Components/index'

export default function Home(){
  const [posts, setposts] = useState([])

  useEffect(()=>{
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setposts(posts.documents)
      }
    })
  },[])


  if (posts.length === 0 ){
    return (
      <div>
        <Container>
          <div className='text-center py-8'>
            <h1 className='text-3xl font-bold'>No Posts Available</h1>
          </div>
        </Container>
      </div>
    )
  }else {
    return (
      <div className="w-full py-8">
        <Container>
          <div className='flex flex-wrap'>
            {posts.map((post) => (
              <div key={post.$id} className='p-2 w-1/4'>
                <PostCard post={post} />
              </div>
            ))}
          </div>
        </Container>
      </div>
    )
  }



}

