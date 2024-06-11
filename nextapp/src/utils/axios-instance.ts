import axios from "axios";
import { isBrowser } from "./utils";
import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  // timeout: 60000,
});

const getToken = async (): Promise<string> => {
  try {
    const session = await (isBrowser()
      ? getSession()
      : getServerSession(options));
    return session?.user?.accessToken || "";
  } catch (e) {
    console.error({ e });
    return "";
  }
};

// Add a request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    // Don't worry next-auth cache accessToken most of the time
    const token = await getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosInstance;
