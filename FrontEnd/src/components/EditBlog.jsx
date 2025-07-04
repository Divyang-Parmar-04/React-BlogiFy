import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'
import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateBlog } from "../features/authSlice"
import { config } from "../env/config"
import RTE from "../components/RTE"
import { useParams } from 'react-router-dom'
import ResponseNotification from './ResponseNotification'

function EditBlog() {
  //Alert Function 
  const [status, setStatus] = useState(false)
  const [response, setResponse] = useState('loading')
  const [msg, setMsg] = useState('')


  const formRef = useRef(null)
  const { blogId } = useParams()
  const { user, } = useAuth0()
  const dispatch = useDispatch()

  const [file, setFile] = useState(null)
  const [isDisabled, setisDisabled] = useState(false)
  const [content, setContent] = useState(`<h2>Hello World!</h2><p>This is some dummy content for testing.</p>`)
  const [title, setTitle] = useState("")
  const [blogType, setBlogType] = useState("")
  const [summary, setSummary] = useState("")
  const [imgUrl, setimgUrl] = useState("")

  // current - BLOG
  const [blog, setBlog] = useState({})

  const blogs = useSelector((state) => state.auth.userData)

  useEffect(() => {

    if (Array.isArray(blogs)) {
      const blog = blogs.find((blog) => blog._id === blogId);
      if (blog) {
        setBlog(blog)
        setTitle(blog.title)
        setSummary(blog.summary)
        setimgUrl(blog.imgUrl)
        setBlogType(blog.blogType)
        setContent(blog.content)
      }
    }
  }, [blogs])


  async function handleuploadFile(file) {
    console.log(file)
    if ("hello", file) {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("upload_preset", config.cloudineryUploadPreset) // no need for secret
      formData.append("cloud_name", config.cloudineryCloudName)

      try {
        const res = await fetch("https://api.cloudinary.com/v1_1/dw2osdku4/image/upload", {
          method: "POST",
          body: formData,
        })
        const data = await res.json()
        console.log("Uploaded to:", data.secure_url)
        alert("file uploaded successfully")
        return data.secure_url;
      }

      catch (error) {
        console.log("file upload err : ", error)
        alert("upload file error")
        return null
      }

    }
    return null
  }

  async function handleOnsubmit(e) {
    e.preventDefault()
    setisDisabled(true)
    setStatus(true)

    const currentfile = file
    let imageUrl
    if (currentfile) {
      imageUrl = await handleuploadFile(currentfile)
    }
    if (imageUrl || blog) {
      const blog = {
        title: title,
        imgUrl: imageUrl || imgUrl,
        content: content,
        blogType: blogType,
        summary: summary,
        blogId: blogId
      }
      // console.log(blog)

      axios.post("/api/updateblog", blog)
        .then((res) => {
          if (res.data.blog) {
            // alert("Blog is updated successfully")
            // dispatch(deleteBlog({id:blogId}))
            setResponse('true')
            setMsg('Blog Is Updated')
            dispatch(updateBlog(res.data.blog))
          }
          else {
            alert("blog is not update please try latter")
            setResponse('false')
            setMsg('Blog Is Not Update')
          }
        })
        .catch((err) => {
          console.log("BackEnd blog updation error", err)
          setStatus(false)

        })
      //   formRef.current.reset()
      setFile(null)
      setisDisabled(false)
    }
    else {
      alert("please try letter")
      setStatus(false)
    }
  }


  return (
    <div className="addblog-container">
      <ResponseNotification visible={status} onClose={() => setStatus(false)} response={response} msg={msg} />
      <div className="form-container">
        <h1>Create Blog</h1>

        <form className='form' onSubmit={handleOnsubmit} ref={formRef}>

          <div className="title-input add-blog-space">
            <h3>Title</h3>
            <input
              name='title'
              type="text"
              placeholder='title'
              disabled={isDisabled}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='title'
            />
          </div>

          <div className="image-upload-input add-blog-space">
            <h3>Blog Image</h3>
            <input
              name='imgUrl'
              type="file"
              placeholder=''
              disabled={isDisabled}
              className='post-img'
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <div className="RTE add-blog-space">
            <h3>Content</h3>
            <p style={{ color: "green" }}>* note : if you want to upload code then write code inside the table  </p>
            <RTE content={content} onSetContent={(value) => setContent(value)} />
          </div>

          <div className="title-input add-blog-space">
            <h3>Type</h3>
            <select
              name="blog-type"
              id="type"
              className='title'
              value={blogType}
              onChange={(e) => setBlogType(e.target.value)}
              disabled={isDisabled}>
              <option value="Personal">Personal</option>
              <option value="Business">Business</option>
              <option value="Food">Food</option>
              <option value="Lifestyle">LifeStyle</option>
              <option value="Travel">Travel</option>
              <option value="Fitness">Fitness</option>
              <option value="News">News</option>
              <option value="Sports">Sports</option>
              <option value="Technical">Technical</option>
              <option value="Nature">Nature</option>
            </select>
          </div>

          <div className="title-input add-blog-space">
            <h3>Summary</h3>
            <textarea
              type="text"
              name='summary'
              placeholder='title'
              disabled={isDisabled}
              value={summary}
              className='summary'
              onChange={(e) => setSummary(e.target.value)}
            />
          </div>
          <div className="btns">
            <button id='sub' disabled={isDisabled} type='submit'>Submit</button>
            <button id='res' disabled={isDisabled} type='reset'>Reset</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditBlog