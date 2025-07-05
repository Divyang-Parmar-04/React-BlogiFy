
import '../welcome.css';
import {useAuth0} from '@auth0/auth0-react'
import api from '../utils/api'

const WelcomePage = () => {
   
   const {loginWithRedirect} = useAuth0()

  return (
    <div className="welcome-section">
      <h2>
        Welcome to <span className="highlight">BlogiFy</span>
      </h2>
      <p className="tagline">Create and Read vast Blogs in BlogiFy</p>
      <p className="description">
        Explore a world of insightful blogs, share your stories, and connect with a community of writers and readers.
      </p>
      <button className="start-btn" onClick={()=>loginWithRedirect()}>
        Get started
      </button>
    </div>
  );
};

export default WelcomePage;