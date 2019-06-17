import axios from 'axios';
import router from '../router';


const axiosInstance = axios.create({
  headers: {
    Accept: 'application/json',
    withCredentials: true,
  },
});

axiosInstance.interceptors.response.use(null, (error) => {
  if (error.response.status === 404) {
    router.push({ name: 'error' });
  }
  if (error.response.status === 500) {
    router.push({ name: 'server_error' });
  }
  return Promise.reject(error);
});

export default axiosInstance;
