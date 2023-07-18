import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './media.css';
import './fonts/AvenirNextLTPro-Regular.woff';
import './fonts/AvenirNextLTPro-Bold.woff';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import '@popperjs/core';
import "bootstrap";
import Swal from "sweetalert2";

const root = ReactDOM.createRoot(document.getElementById('root'));
axios.defaults.baseURL = 'http://localhost:3006';
const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfaWQiOjEsImZpcnN0X25hbWUiOiJSYWplbmRlciIsImxhc3RfbmFtZSI6IlZhbmFtYWxhIiwiZW1haWwiOiJydmFuYW1hbGFAdmFjby5jb20iLCJyb2xlIjoiZW1wbG95ZWUiLCJlbXBfaWQiOjEsInByb2plY3RfaWQiOm51bGwsIm5lZWRzUGFzc3dvcmRSZXNldCI6bnVsbH0sImlhdCI6MTY4ODQ2MTI1NCwiZXhwIjoxNjg4NDcyMDU0fQ.PxCnAL60dkZ9RgN3CohRZbccOopn3JhDS8Vj1HgnWao'
const token = localStorage.getItem('jwt-access-token') || jwt;

// Request interceptors for API calls
axios.interceptors.request.use(
  config => {
    config.headers['Authorization'] = `Bearer ${token}`;
      return config;
    },
    error => {
      localStorage.removeItem("jwt-access-token");
      localStorage.removeItem("user");
      localStorage.removeItem("user_role");
      return Promise.reject(error);
    }
);

// Response interceptor for API calls
axios.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    let errTitle = '';
    let errText = '';

    if (error.code === "ERR_NETWORK") {
      errTitle = 'Network Error';
      errText = 'Check connection to Server!';
    } else if (error.code === "ERR_BAD_RESPONSE" && !error.response?.data?.auth) {
      errTitle = 'Session Expired!';
      errText = `${error.response?.data?.message} Please Login again.`;
    } else {
      return Promise.reject(error);
    }

    const { value: isConfirmed } = await Swal.fire({
      icon: "error",
      title: errTitle,
      text: errText,
      confirmButtonColor: "#0e4372",
      showConfirmButton: true
    });
    if (isConfirmed) {
      localStorage.removeItem("jwt-access-token");
      localStorage.removeItem("user");
      localStorage.removeItem("user_role");
      window.location.reload(true);
    };
  }
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
