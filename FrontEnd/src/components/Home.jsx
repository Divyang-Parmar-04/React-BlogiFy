import { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import api from '../utils/api'

import { motion} from 'framer-motion'

function Home(props) {
      
    const navigate = useNavigate()
    // const blogs = useSelector((state) => state.auth.userData)
    const blogs = props.blogs
    // console.log(blogs)
  
    const [blog1, setBlog1] = useState({})
    const [blog2, setBlog2] = useState({})
    const [blog3, setBlog3] = useState({})
  
    useEffect(() => {
      if (Array.isArray(blogs) && blogs.length >= 3) {
        // Shuffle a copy of the blogs array and take the first 3
        const shuffled = [...blogs].sort(() => 0.5 - Math.random());
        setBlog1(shuffled[0]);
        setBlog2(shuffled[1]);
        setBlog3(shuffled[2]);
      }
    }, [blogs]);
  
  
    return (
      <>
        <div className="home-default-cards-container">
          <motion.div
            initial={{opacity: 0,x: -200}}
            whileInView={{opacity: 1,x: 0,transition: {duration: 0.6}}}
          >
            <div className="left-card">
              <img src={blog1.imgUrl} alt="" />
              <div className="content">
                <button onClick={()=>navigate(`/blog/${blog1._id}`)}>read</button>
                <h2>{blog1.title}</h2>
                <p>{blog1.summary}</p>
              </div>
            </div>
          </motion.div>
          <div className="right-card">
            <motion.div
              initial={{
                opacity: 0,
                //  scale:0.6,
                y: -200
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.5
                }
              }}
            >
              <div className="top-card">
                <img src={blog2.imgUrl} alt="" />
                <div className="content">
                  <button onClick={()=>navigate(`/blog/${blog2._id}`)}>read</button>
                  <h2>{blog2.title}</h2>
                  <p>{blog2.summary}</p>
                </div>
              </div>
            </motion.div>
            {/* buttom animation */}
            <motion.div
              initial={{
                opacity: 0,
                 scale:0.6,
                // y:-200
              }}
              whileInView={{
                opacity: 1,
                // y: 0,
                scale:1,
                transition: {
                  duration: 0.5
                }
              }}
            >
              <div className="bottom-card">
                <img src={blog3.imgUrl} alt="" />
                <div className="content">
                  <button onClick={()=>navigate(`/blog/${blog3._id}`)}>read</button>
                  <h2>{blog3.title}</h2>
                  <p>{blog3.summary}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </>
    )
  }
  
  export default Home