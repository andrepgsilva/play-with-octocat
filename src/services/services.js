import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    'Accept': 'application/vnd.github.v3+json'  // middle priority
  }
})

export default axiosInstance;