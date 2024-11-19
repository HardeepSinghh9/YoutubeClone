import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

//JWT to all request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const registerUser = async (username, email, password) => {
  try {
    const response = await api.post("/register", { username, email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Something went wrong!";
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await api.post("/login", { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Something went wrong!";
  }
};
