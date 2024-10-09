import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
  headers: {
    Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
        console.error("Unauthorized access - possibly invalid token.");
      } else if (status === 404) {
        console.error("Requested resource not found.");
      } else if (status === 500) {
        console.error("Server error - try again later.");
      }
    } else if (error.request) {
      console.error("No response from the server. Check your connection.");
    } else {
      console.error("Error setting up request: ", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
