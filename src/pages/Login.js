import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Layout from "../components/Layout";
import Footer from "../components/Footer";

function EmpShow() {
  const [tryingLogin, setTryingLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    Swal.showLoading();
    setTryingLogin(true);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const data = {
      email: email,
      password: password,
    };
    axios
      .post("/users/sign-in/", data, config)
      .then(function (response) {
        localStorage.setItem("jwt-access-token", response.data?.token);
        Swal.fire({
          icon: "success",
          title: `Welcome ${response.data?.user?.first_name}!`,
          showConfirmButton: false,
          timer: 2000,
        });
        const waitforJWT = setInterval(() => { //add a timeout to ensure jwt is set before navigation
          if (localStorage.getItem("jwt-access-token")){
            setTryingLogin(false);
            setPassword("");
            setEmail("");
            setErrMessage("");
            navigate("/filter");
            clearInterval(waitforJWT);
            window.location.reload(true);
            Swal.hideLoading();
          }
        }, 1000);
      })
      .catch(function (error) {
        const errMsg = error?.response?.data?.message;
        setErrMessage(errMsg);
        Swal.fire({
          icon: "error",
          title: errMsg,
          showConfirmButton: false,
          timer: 2000,
        });
        setTryingLogin(false);
      });
  };

  return (
    <>
    <br/>
    <div className="container w-auto">
      <div className="container w-auto">
        <img src='images/Logo.png' alt="My Image" />
      </div>
      <br/>
      <div class="container w-auto">
            <div class="">
                <div class="rounded d-flex justify-content-center">
                    <div class="col-lg-4 col-md-6 col-sm-12 form-bg-radius">
                        <div class="text-center">
                            <h4 className="login_header">Log in to VacoFlex</h4>
                        </div>
                        {(errMessage)? <p className="text-danger"> {errMessage}</p> : ""}
                        <form>
                          <div class="p-4 text-center">
                                <div class="input-group mb-3">
                                    <span class="input-group-text"><i class="bi bi-person-fill text-gray"></i></span>
                                    <input
                                      placeholder="Username or Email"
                                      onChange={(event) => {
                                        setEmail(event.target.value);
                                      }}
                                      value={email}
                                      type="text"
                                      className="form-control"
                                      id="email"
                                      name="email"
                                    />
                                </div>
                                <div class="input-group mb-3">
                                    <span class="input-group-text"><i class="bi bi-lock-fill text-gray"></i></span>
                                    <input 
                                      placeholder="password" 
                                      onChange={(event) => {
                                        setPassword(event.target.value);
                                      }}
                                      value={password}
                                      type="password"
                                      className="form-control"
                                      id="password"
                                      name="password"
                                    />
                                </div>
                                <button class="btn btn-primary text-center mt-2 px-5 login_button" 
                                  disabled={tryingLogin}
                                  onClick={handleLogin}
                                  type="submit"
                                >
                                    Login
                                </button>
                          </div>    
                        </form>
                        <div class="text-center poweredby_logo">
                          Powered by <img src='images/VacoBinary_Logo.png' alt="My Image" />
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        <div className="container w-auto login_footer">
          <Footer />
        </div>                              
    </div>   
    </>
  );
}

export default EmpShow;
