import React, { useContext, useState } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { POST } from "../../utils/rest.js";

function CreateRoom(props) {
  const { session } = useContext(AuthContext);
  const [room, setRoom] = useState("");

  const execute = () => {
    const data = {
      name: room,
    };
    // const url = "http://" + window.location.hostname + ":5000/api/v1/chats";
    // console.log("data = ", data);
    // const bearer = "Bearer " + session.token;
    // fetch(url, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: bearer,
    //   },
    //   body: JSON.stringify(data),
    // })
    POST("chats", data, session.token)
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        if (data.success === false) console.log(data);
        else if (data.data) {
          console.log(data);
          props.addRoom(data.data);
        }
      })
      .catch((error) => {
        setRoom("");
        console.error("Error:", error.message);
      });
    setRoom("");
  };

  return (
    <div className="input-group rounded mb-3">
      <input
        type="text"
        className="form-control rounded"
        placeholder="New Chat"
        aria-label="Search"
        aria-describedby="search-addon"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
      />

      <button
        type="button"
        className="btn btn-light btn-sm btn-rounded mx-2"
        onClick={() => execute()}
      >
        New Chat
      </button>
    </div>
  );
}

export default CreateRoom;
