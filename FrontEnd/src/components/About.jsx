import React, { useState } from 'react'
import Alert from './Alert'

function About() {
  const [alert, setAlert] = useState(false)
  const [response, setResponse] = useState(false)

  function handleonclick() {

    setAlert(true)
     setTimeout(()=>{
      setAlert(false)
     },2500)
  }
  return (
    <>
      <div>About</div>
      <Alert msg = {"Blog is soccessfully created"} status = {alert} response = {response}/>
      <button onClick={handleonclick}>click</button>
    </>
  )
}

export default About