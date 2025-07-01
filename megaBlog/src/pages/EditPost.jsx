import React,{useState,useEffect} from 'react'
import { Container, PostForm } from '../Components/index'
import appwriteService from '../appwrite/config'
import { useNavigate,useParams } from 'react-router-dom'

function EditPost() {

  const [post,setPosts] = useState(null)
  const {slug} = useParams()
  const navigate = useNavigate()

  useEffect(()=>{
    if (slug) {
      appwriteService.getPost(slug).then((p)=>{
        if (p){
          setPosts(p)
        }
      })
    }else {
      navigate('/')
    }

  },[slug,navigate])

  return post ? (
    <div className='py-8'>
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null 
}

export default EditPost