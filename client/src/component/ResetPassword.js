import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { POST } from "../utils/rest.js";

function ResetPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailSentFlag, setEmailSentFlag] = useState(false);
  const [resetToken, setResetToken] = useState(undefined);
  const [errorMsg, setErrorMsg] = useState(undefined);
  const [successMsg, setSuccessMsg] = useState(undefined);

  const resetPassword = () => {
    const data = {
      password: password,
    };

    POST(`auth/resetpassword/${resetToken}`, data, null)
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        if (data.success === false) setErrorMsg(data.error);
        else if (data.data) {
          // navigate("/login");
          setErrorMsg(null);
          setSuccessMsg("Password has been updated!");
        }
      })
      .catch((error) => {
        setEmail("");
        setPassword("");
        setErrorMsg(error.message);
        console.error("Error:", error.message);
      });
    setEmail("");
    setPassword("");
  };

  const getTokenByEmail = () => {
    const data = {
      email: email,
    };

    POST("auth/forgotpassword", data, null)
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        if (data.success === false) setErrorMsg(data.error);
        else if (data.data) {
          // navigate("/login");
          setEmailSentFlag(true);
          setErrorMsg(null);
        }
      })
      .catch((error) => {
        setEmailSentFlag(false);
        if (error.message === "Failed to fetch") {
          setErrorMsg("Server is down :(");
        } else {
          setErrorMsg(error.message);
        }

        console.error("Error:", error.message);
      });
    setEmail("");
  };

  return (
    <section className="vh-100" style={{ backgroundColor: "#eee" }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: "25px" }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Reset Password
                    </p>

                    <form className="mx-1 mx-md-4">
                      {emailSentFlag === false ? (
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="email"
                              id="form3Example3c"
                              className="form-control"
                              name="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example3c"
                            >
                              Your Email
                            </label>
                          </div>
                        </div>
                      ) : null}

                      {emailSentFlag !== false ? (
                        <div className="d-flex flex-row align-items-center mb-4">
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              id="form3Example4c2"
                              className="form-control"
                              value={resetToken}
                              onChange={(e) => setResetToken(e.target.value)}
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example4c2"
                            >
                              Token
                            </label>
                          </div>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              id="form3Example4c3"
                              className="form-control"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example4c3"
                            >
                              New Password
                            </label>
                          </div>
                        </div>
                      ) : null}

                      {errorMsg ? (
                        <div className="alert alert-danger" role="alert">
                          {errorMsg}
                        </div>
                      ) : null}

                      {successMsg ? (
                        <div className="alert alert-success" role="alert">
                          {successMsg}
                        </div>
                      ) : null}

                      {emailSentFlag === false ? (
                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="button"
                            className="btn btn-primary btn-lg"
                            onClick={() => getTokenByEmail()}
                          >
                            Send Token
                          </button>
                        </div>
                      ) : (
                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="button"
                            className="btn btn-primary btn-lg"
                            onClick={() => resetPassword()}
                          >
                            Reset Password
                          </button>
                        </div>
                      )}
                      <a className="text-muted" href="/login">
                        Back to Login
                      </a>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid"
                      alt=""
                    ></img>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResetPassword;
