import { useContext, useRef, useState, useEffect } from "react";
import Navbar from "./navigation/Navbar";
import { AuthContext } from "../auth/AuthContext";
import { POST_FILE } from "../utils/rest.js";
import { formatDateShort } from "../utils/dates.js";
import { getProfileData as getProfileDataWithAxios } from '../api/index.js';

function Profile(props) {
  const { session } = useContext(AuthContext);
  const inputFile = useRef(null);
  const [profile, setProfile] = useState({});
  const baseUrl = "http://" + window.location.hostname + ":5000/static/";
  const onButtonClick = () => {
    inputFile.current.click();
  };

  useEffect(() => {
    getProfileData();
  }, []);
  //INSTEAD OF THIS ....
  const getProfileData = () => {
    const url = "http://" + window.location.hostname + ":5000/api/v1/profile";
    const bearer = "Bearer " + session.token;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setProfile(data.data);
        let fromStorage = localStorage.getItem("session");
        fromStorage = JSON.parse(fromStorage);
        fromStorage.ava = data.data.ava;
        localStorage.setItem("session", JSON.stringify(session));
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  };

  /** ... you can have this */
  const getProfileData2 = () => {
    try {
      const data = await getProfileDataWithAxios();
      console.log("Success:", data);
      setProfile(data.data);
      let fromStorage = localStorage.getItem("session");
      fromStorage = JSON.parse(fromStorage);
      fromStorage.ava = data.data.ava;
      localStorage.setItem("session", JSON.stringify(session));
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  /**
 * Your components cannot know about server api, tokens and bearers;
 // const url = "http://" + window.location.hostname + ":5000/api/v1/profile";
 // const bearer = "Bearer " + session.token;

 // Maximum they can do is calling a function from api part of your FE project and pass arguments 
    to it.
 */

  const fileChangedHandler = (event) => {
    const formData = new FormData();
    formData.append("ava", event.target.files[0]);
    formData.append("name", event.target.files);

    POST_FILE("profile/ava", formData, session.token)
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        getProfileData();
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  };

  return (
    <section style={{ backgroundColor: "#eee" }}>
      <Navbar name={session.username} />
      <input
        type="file"
        id="file"
        ref={inputFile}
        accept=".jpeg,.jpg,.png"
        onChange={fileChangedHandler}
        style={{ display: "none" }}
      />
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-body text-center">
                <img
                  src={`${baseUrl + profile.ava}?${new Date().getTime()}`}
                  alt="avatar"
                  className="rounded-circle img-fluid"
                  style={{ width: "150px" }}
                ></img>
                <h5 className="my-3">{profile.name}</h5>
                <p className="text-muted mb-1">Junior NodeJs Developer</p>
                <p className="text-muted mb-4">Wroclaw, PL</p>
                <div className="d-flex justify-content-center mb-2">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={onButtonClick}
                  >
                    New Picture
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Full Name</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{profile.name}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Email</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{profile.email}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Role</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{profile.role}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Member since</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">
                      {formatDateShort(profile.memberSince)}
                    </p>
                  </div>
                </div>
                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
