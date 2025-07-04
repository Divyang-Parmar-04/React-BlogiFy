import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux'
import { useAuth0 } from "@auth0/auth0-react"
function Navbar() {

  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0()
  

  const [isdropDown,setIsDropdownOpen] = useState(false)

  const toggleDropdown = () => setIsDropdownOpen(prev => !prev);
  const closeDropdown = () => setIsDropdownOpen(false);

  return (
    <>
      <nav className='navbar'>

        <div className="dropdown-btn">

          <div className="menu" onClick={toggleDropdown}>
            <img src="/icons/menu.svg" alt="" />
          </div>
          <div className="logo">
            <img src="/icons/logo4.png" alt="" />
          </div>
          <h2 className='logo-name'>Blogify</h2>

        </div>

        <div className="dropdown"style={{left:isdropDown?"0px":'-150px',}}>

          <div className="dropdown-logo">
            {isAuthenticated ? (
              <img src={user.picture} alt="" />
            ) : (<img src="/assets/logo.jpg" alt="" />)}
          </div>

          <Link to="/" className='link' onClick={closeDropdown}>Home</Link>
          <Link to = '/about' className='link' onClick={closeDropdown}>About</Link>

          {isAuthenticated && (
            <>
              <Link to="/createblog" className='link' onClick={closeDropdown}>Create Blog</Link>
              <Link to="/myblogs" className='link' onClick={closeDropdown}>My Blogs</Link>
            </>

          )}
        </div>
        <div className='nav-btns'>
          <li><Link to="/" className='link'>Home</Link></li>
          <li><Link to="/about" className='link'>About</Link></li>
          {isAuthenticated && (
            <>
              <li><Link to="/createblog" className='link'>Create Blog</Link></li>
              <li><Link to="/myblogs" className='link'>My Blogs</Link></li>
            </>
          )}

        </div>
        <div className="accsess-btn">
          {isAuthenticated ? (<button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Logout</button>)
            : (<>
              <button onClick={() => loginWithRedirect()} className='login-btn'>Sign-up</button>
              {/* <button onClick={handleSingUp} className='signup-btn'>sign-up</button> */}
            </>
            )
          }
        </div>
      </nav>
    </>
  )
}

export default Navbar