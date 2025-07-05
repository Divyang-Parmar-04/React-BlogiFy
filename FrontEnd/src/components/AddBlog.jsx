import { useAuth0 } from '@auth0/auth0-react'
import api from '../utils/api'
import axios from 'axios'
import React, { useState, useRef,useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addNewBlog } from "../features/authSlice"
import {config} from "../env/config"
import RTE from "../components/RTE"
import Spinner from './Spinner'
import Alert from './Alert'
import ResponseNotification from './ResponseNotification'


function AddBlog() {

  //Alert Function 
  const [status, setStatus] = useState(false)
  const [response, setResponse] = useState('loading')
  const [msg,setMsg] = useState('')

  const formRef = useRef(null)

  const [file, setFile] = useState(null)
  const [isDisabled, setisDisabled] = useState(false)
  const [content, setContent] = useState(`<h2>Hello World!</h2><p>This is some dummy content for testing.</p>`)
  const { user, } = useAuth0()


  const dispatch = useDispatch()

  async function handleuploadFile(file) {
    console.log(file)
    if ("hello",file) {
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
        // alert("file uploaded successfully")
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

    // setLoader('flex')
    const title = e.target.title.value
    const currentfile = file
    const text = content || "none"
    const blogType = e.target.blogtype.value
    console.log(blogType)
    const summary = e.target.summary.value

    const imageUrl = await handleuploadFile(currentfile)

    if (imageUrl) {
      const blog = {
        title: title,
        imgUrl: imageUrl,
        content: text,
        blogType:blogType,
        summary: summary,
        userName: user.email,
      }
      console.log(blog)

      api.post("/api/createblog", blog)
        .then((res) => {
          if (res.data.blog) {
            // setLoader('none')
            // alert("Blog is created successfully")
             setResponse('true')
             setMsg('Blog Created Successfully')
            dispatch(addNewBlog(res.data.blog))
          }
          else {
            setResponse(false)
            setMsg('Blog Is not Created')
          }
        })
        .catch((err) => {
          console.log("BackEnd blog creation error", err)
          setStatus(false)

        })
      formRef.current.reset()
      setFile(null)
      setisDisabled(false)
    }
    else {
      alert("please try letter")
      setStatus(false)
    }
  }

  return (
    <>
     <ResponseNotification visible={status} onClose={()=>setStatus(false)} response={response} msg={msg}/>
      <div className="addblog-container">
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
                required className='title'
                maxLength={100}
              />
            </div>

            <div className="image-upload-input add-blog-space">
              <h3>Blog Image</h3>
              <input
                name='imgUrl'
                type="file"
                placeholder=''
                disabled={isDisabled}
                required
                className='post-img'
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <div className="RTE add-blog-space">
              <h3>Content</h3>
              <p style={{color:"green"}}>* note : if you want to upload code then write code inside the table  </p>
               <RTE content = {content} onSetContent = {(value)=>setContent(value)}/>
            </div>

            <div className="title-input add-blog-space">
              <h3>Type</h3>
              <select 
              name="blogtype" 
              id="type" 
              className='title'
              disabled = {isDisabled}
              >
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
              placeholder='summary'
              disabled={isDisabled}
              className='summary'
              maxLength={180}
              />
            </div>
            <div className="btns">
              <button id='sub' disabled={isDisabled} type='submit'>Create</button>
              <button id='res' disabled={isDisabled} type='reset'>Reset</button>
            </div>
          </form>
        </div>
      </div>
      </>
  )
}

export default AddBlog