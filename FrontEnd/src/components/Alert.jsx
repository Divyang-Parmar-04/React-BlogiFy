import React, { useEffect, useState } from 'react'

function Alert(props) {

  const status = props.status
  const response = props.response
  const msg = props.msg


  return (
    <>
        <div className="alert-container">
          <div className="alert-box" style={{backgroundColor:response?'green':'red',top:status?'80px':'-80px'}}>
            {response?(<h2>✅</h2>):(<h2>❎</h2>)}
            <h3>{msg}</h3>
          </div>
        </div>

    </>
  ) 
}

export default Alert