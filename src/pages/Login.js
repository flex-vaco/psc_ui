import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Layout from "../components/Layout";

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
            navigate("/home");
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
      <div className="container w-25">
        <h2 className="text-center mt-5 mb-3">Project Fractional</h2>
        <div className="card">
          <div className="card-header">
            <h3 className="text-center">Login</h3>
          </div>
          <div className="card-body">
          {(errMessage)? <p className="text-danger"> {errMessage}</p> : ""}
            <form>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
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
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
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
              <div className="row">
                <div className="col-sm-6">
                  <button
                    disabled={tryingLogin}
                    onClick={handleLogin}
                    type="submit"
                    className="btn btn-outline-primary mt-3"
                  >
                    Login
                  </button>
                </div>
                {/* <div className="col-sm-6">
                  <Link className="btn btn-outline-info mt-3 float-right">
                    Sign-up
                  </Link>
                </div> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EmpShow;
