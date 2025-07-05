import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom"
import App from "./App"

//Pages
import HomePage from "./Pages/HomePage"
import CreateBlogPage from './Pages/CreateBlogPage'
import MyBlogPage from './Pages/MyBlogsPage'

import EditBlog from "./components/EditBlog"
import Blog from './components/Blog'

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
        <Route path="/" element={<App />}>
            <Route path="" element={<HomePage/>}/>
            <Route path="createBlog" element={<CreateBlogPage/>} />
            <Route path="myblogs" element = {<MyBlogPage />}/>

            <Route path="blog/:blogId" element={<Blog />} />
            <Route path="update/blog/:blogId" element = {<EditBlog/>}/>

        </Route>
        </>
    )
)
export default router