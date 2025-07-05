import React, { useEffect, useState,useRef } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import api from '../utils/api'


function Card(props) {

  const blogs = props.blogs
  const navigate = useNavigate()

  // const ref = useRef(null);
  // const isInView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' });
  // console.log(blogs)
  // const blogs = useSelector((state) => state.auth.userData)


  return (

      <div className="card-container">
        {blogs.length>0 && blogs.map((blog) => (
          <motion.div
          initial={{
            opacity:0,
            scale : 0.8
          }}
          whileInView={{
            opacity:1,
            scale:1,
            transition : {
              duration: 0.6
            }
          }}
          key={blog._id}
          >
          <div className='card'>
            <div className='card-img-box'>
              <img src={blog.imgUrl} alt="" />
            
            </div>
            <div className="card-info">
              <h2 id='title'>{blog.title}</h2>
              <p>{blog.summary}</p>
              <button onClick={() => navigate(`/blog/${blog._id}`)}>Read</button>
            </div>
          </div>
          </motion.div>
        ))}
        {blogs.length==0?(<h1>No blog found</h1>
        ):(null)}
      </div>

  )
}

export default Card