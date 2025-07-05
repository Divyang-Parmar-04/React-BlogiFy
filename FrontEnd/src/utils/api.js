import axios from 'axios'

// Get base URL from .env
const BASE_URL = import.meta.env.VITE_BACKEND_URL

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL
})

export default api
