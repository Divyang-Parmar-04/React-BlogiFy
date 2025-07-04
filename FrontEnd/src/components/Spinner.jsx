import React from 'react'

function Spinner({display}) {
    // console.log(opacity)
    return (
        <div className="spinner-container" style={{display:display}}>
            <div className="spinner"></div>
            <h3>Please wait</h3>
        </div>
    )
}

export default Spinner