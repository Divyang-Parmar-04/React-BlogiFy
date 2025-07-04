import React, { useEffect, useState } from 'react'
import Card from './Card'
import { useAuth0 } from '@auth0/auth0-react'
import { useSelector } from 'react-redux'

function MyBlog() {

  const blogs = useSelector((state) => state.auth.userData)
  const {user} = useAuth0()
  const [myblog,setMyBlog] = useState([])
  
  useEffect(()=>{
     if(Array.isArray(blogs)){
        const found = blogs.filter((blog)=>blog.userName==user.email)
        if(found)setMyBlog(found)
     }
  },[blogs])

  return (
    <>
    <Card blogs = {myblog}/>
    </>
  )
}

export default MyBlog