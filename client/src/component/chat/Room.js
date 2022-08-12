import { useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { PUT } from "../../utils/rest.js";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

function Room(props) {
  const { session } = useContext(AuthContext);

  const isUserInRoom = (room) => {
    console.log("isUserInRoom: ", room);
    console.log("session.userId: ", session.userId);
    return room && room.participants
      ? room.participants.includes(session.userId)
      : false;
  };

  const execute = (room) => {
    // const url =
    //   "http://" + window.location.hostname + ":5000/api/v1/chats/" + room._id;
    // const bearer = "Bearer " + session.token;
    // fetch(url, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: bearer,
    //   },
    // })
    PUT(`chats/${room._id}`, session.token)
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        if (data.success === false) console.log(data);
        else if (data.data) {
          console.log(data);
          props.joinRoom(data.data);
        }
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  };

  return (
    <li className="p-2 border-bottom" key={props.room.id}>
      <a href="#!" className="d-flex justify-content-between">
        <div className="d-flex flex-row">
          <div>
            <img
              src="https://avatars.githubusercontent.com/u/12508788?s=280&v=4"
              alt="avatar"
              className="d-flex align-self-center me-3"
              width="60"
            ></img>
            <span className="badge bg-success badge-dot"></span>
          </div>
          <div className="pt-1">
            <p
              className="fw-bold mb-0 my-3"
              onClick={() => {
                console.log("room selected: ", props.room.name);
                props.showChat(props.room);
              }}
            >
              {props.room.name}
            </p>
            {/* <p className="small text-muted">Hello, Are you there?</p> */}
          </div>
        </div>
        <div className="pt-1 my-3">
          {!isUserInRoom(props.room) ? (
            <p
              className="small text-muted mb-1"
              onClick={() => execute(props.room)}
            >
              Join
            </p>
          ) : (
            <div class="pt-1">
              {props.room.newMsg !== undefined ? (
                <span class="badge bg-danger float-end">
                  {props.room.newMsg}
                </span>
              ) : null}
            </div>
          )}
        </div>

        {/* not working yet :() */}
        {/* <div className="pt-1 my-3 " href="#!">
          <FontAwesomeIcon icon={faEnvelope}>
            <span className="badge bg-danger badge-dot"></span>{" "}
          </FontAwesomeIcon>
        </div> */}
      </a>
    </li>
  );
}

export default Room;
