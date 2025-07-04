import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux"

import AOS from 'aos';
import 'aos/dist/aos.css';
// css
import './index.css'
// environment variables
import {config} from "./env/config.js"

import {RouterProvider } from 'react-router-dom'
import router from "./router.jsx"
import { store } from "./App/store.js" //Redux store 
import { Auth0Provider } from "@auth0/auth0-react" // auth0 provider

// Initialize AOS here
AOS.init({
  duration: 1000,
  offset: 200,
  easing: 'ease-in-out',
  once: true, // animation only once
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth0Provider
      domain={config.auth0Domain}
      clientId={config.auth0ClientId}
      authorizationParams={{
        redirect_uri: window.location.origin
      }}>
      <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
      </Provider>
      
    </Auth0Provider>
  </StrictMode>,
)
