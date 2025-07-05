
import { useEffect, useState } from "react"
import Navbar from "./components/Navbar"
import Welcome from "./components/Welcome"
import { Outlet } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useAuth0 } from "@auth0/auth0-react"
import axios from "axios"
import api from "./utils/api"
import {setData } from "./features/authSlice"


function App() {
  
  const { user, isAuthenticated} = useAuth0()

  const dispatch = useDispatch()
  
  useEffect(() => {
    if (isAuthenticated && user) {
      api.get("/api/auth/getblogs")
        .then((res) => {
          // console.log(res, "response ")
          const data = res.data.blogs
          if (!data) {
            alert("somthing went wrong ")
          }
          else {
            dispatch(setData(data))
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [isAuthenticated,user,dispatch])

  return (
    <>
      <Navbar />
      {isAuthenticated? (<Outlet />) : (<Welcome />)}
      <footer>
        <h4>@2025 BlogiFy all-rights are reserved</h4>
      </footer>
    </>
  )
}

export default App
