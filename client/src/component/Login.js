import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import { POST } from "../utils/rest.js";
function Login() {
  const navigate = useNavigate();
  const { setSession } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(undefined);

  const execute = () => {
    const data = {
      email: email,
      password: password,
    };

    POST("auth/login", data, null)
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        if (data.success === false) setErrorMsg(data.error);
        else if (data.data) {
          const session = {
            isAuth: true,
            token: data.data.token,
            username: data.data.username,
            email: data.data.email,
            userId: data.data.userId,
            ava: data.data.ava,
          };
          localStorage.setItem("session", JSON.stringify(session));
          setSession(session);
          navigate("/lobby");
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
                      Login
                    </p>

                    <form className="mx-1 mx-md-4">
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

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="password"
                            id="form3Example4c"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <label
                            className="form-label"
                            htmlFor="form3Example4c"
                          >
                            Password
                          </label>
                        </div>
                      </div>

                      {errorMsg ? (
                        <div className="alert alert-danger" role="alert">
                          {errorMsg}
                        </div>
                      ) : null}

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          type="button"
                          className="btn btn-primary btn-lg"
                          onClick={() => execute()}
                        >
                          Login
                        </button>
                      </div>
                      <p className="small mb-2 ">
                        <a className="text-muted" href="/resetpassword">
                          Forgot password?
                        </a>
                      </p>
                      <p>
                        Don't have an account?{" "}
                        <a href="/register" className="link-info">
                          Register here
                        </a>
                      </p>
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

export default Login;
