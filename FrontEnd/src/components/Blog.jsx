import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Edit3, Trash2, Calendar, User, ArrowLeft } from 'lucide-react';
import { deleteBlog } from '../features/authSlice';
import Alert from './Alert';
import '../blog.css';

import { useAuth0 } from '@auth0/auth0-react'

const Blog = () => {

  const { user } = useAuth0()

  const [status, setStatus] = useState(false);
  const [response, setResponse] = useState(false);
  const [msg, setMsg] = useState('');
  const [blog, setBlog] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const blogs = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blogId } = useParams();

  const handleAlert = (message, response) => {
    setStatus(true);
    setMsg(message);
    setResponse(response);
    setTimeout(() => setStatus(false), 2500);
  };

  useEffect(() => {
    if (Array.isArray(blogs)) {
      const found = blogs.find((blog) => blog._id === blogId);
      if (found) setBlog(found);
    }
  }, [blogs, blogId]);

  const handleDeleteBlog = () => {
    if (blog && !isDeleting) {
      setIsDeleting(true);

      axios.post('/api/deleteblog', { id: blog._id })
        .then((res) => {
          if (res.data.blog) {
            setTimeout(() => {
              handleAlert("Blog deleted successfully", true);
              dispatch(deleteBlog({ id: blog._id }));

              setTimeout(() => navigate("/"), 2500);
              setIsDeleting(false);
            }, 1000);
          }
          else{
          // console.log(res.data)
          alert('somthing went wromg')
          }
        })
        .catch((err) => {
          // console.log(err)
          alert('somthing went wromg')
        })

    }
  };

  const handleEditBlog = () => {
    if (blog) navigate(`/update/blog/${blog._id}`);
  };

  const handleGoBack = () => navigate(-1);

  if (!blog) {
    return (
      <div className="blog-loading">
        <div className="loading-spinner"></div>
        <p>Loading blog...</p>
      </div>
    );
  }

  return (
    <>
      <Alert msg={msg} status={status} response={response} />
      <div className="blog-wrapper">
        <div className="blog-content-container">
          <button onClick={handleGoBack} className="btn-back">
            <ArrowLeft className="icon" />
            Back to Blogs
          </button>

          <article className="blog-article-box">
            <div className="blog-article-header">
              <div className="blog-controls">
                {user && user.email == blog.userName && (
                  <>
                    <button
                      onClick={handleEditBlog}
                      className="btn edit"
                      disabled={isDeleting}
                    >
                      <Edit3 className="icon" />
                      Edit
                    </button>

                    <button
                      onClick={handleDeleteBlog}
                      className="btn delete"
                      disabled={isDeleting}
                    >
                      <Trash2 className="icon" />
                      {isDeleting ? 'Deleting...' : 'Delete'}
                    </button>
                  </>

                )}
              </div>

              <div className="blog-image-container">
                <img src={blog.imgUrl} alt={blog.title} />
              </div>

              <div className="blog-meta-container">
                <h1>{blog.title}</h1>
                <div className="meta-details">
                  <div><User className="icon" /> {blog.author}</div>
                  <div>
                    <Calendar className="icon" />
                    {new Date(blog.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="blog-article-body">
              <div
                dangerouslySetInnerHTML={{ __html: blog.content }}
                className="blog-html-content"
              />
            </div>
          </article>
        </div>
      </div>
    </>
  );
};

export default Blog;
