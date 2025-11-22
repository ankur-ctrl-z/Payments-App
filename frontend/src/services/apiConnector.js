// apiConnector.js
import axios from "axios";

export const axiosInstance = axios.create({
  headers: { 
    "Content-Type": "application/json",
  },
});

export const apiConnector = (method, url, bodyData = {}, headers = {}, params = {}) => {
  return axiosInstance({
    method,
    url,
    data: bodyData,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    params,
  });
};



