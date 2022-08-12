import React, { useState, useEffect, useContext } from "react";
import useWebSocket from "react-use-websocket";
import { AuthContext } from "../../auth/AuthContext";
import Message from "./Message";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faPaperclip,
//   faSmile,
//   faPaperPlane,
// } from "@fortawesome/free-solid-svg-icons";

function ChatWindow(props) {
  const { session } = useContext(AuthContext);
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const baseUrl = "http://" + window.location.hostname + ":5000/static/";
  const { sendMessage, lastMessage } = useWebSocket(
    `ws://localhost:5000/ws/${session.token}`
  );

  useEffect(() => {
    console.log("in the use effect");
    setMessages(props.messages);
  }, [props.selectedRoom]);

  useEffect(() => {
    console.log("in the use effect 2");
    setMessages(props.messages);
  }, [props.selectedRoom]);

  useEffect(() => {
    if (lastMessage !== null) {
      console.log("lastMessage = ", lastMessage);
      try {
        const newMsg = JSON.parse(lastMessage.data);
        console.log("newMsg = ", newMsg);
        // check if message is for current chat
        if (newMsg.roomId === props.selectedRoom._id) {
          setMessages((prev) => prev.concat(newMsg.msg));
        } else {
          // if not notify the other room that new message arrived
          props.notifyRoom(newMsg.roomId);
        }
      } catch (err) {
        console.log(err);
      }

      //
    }
  }, [lastMessage, setMessages]);

  const execute = () => {
    if (inputText.length < 1) return;
    // setMessages([...messages, { msg: inputText, time: "12:00 PM | Aug 13" }]);
    const data = {
      roomId: props.selectedRoom._id,
      msg: {
        body: inputText,
        date: new Date(),
        userId: session.userId,
        username: session.username,
      },
    };
    sendMessage(JSON.stringify(data));
    setInputText("");
  };
  console.log("ChatWindow props: ", props);
  return (
    <div className="col-md-6 col-lg-7 col-xl-8">
      <h2 className="text-muted "> #{props.selectedRoom.name}</h2>
      <div
        className="pt-3 pe-3 overflow-scroll"
        data-mdb-perfect-scrollbar="true"
        style={{ position: "relative", height: "100%", maxHeight: "75%" }}
      >
        {messages && messages.map((m) => <Message key={m._id} message={m} />)}
      </div>

      <div className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">
        <img
          src={`${baseUrl + session.ava}?${new Date().getTime()}`}
          alt="avatar 3"
          style={{ width: "40px", height: "40px" }}
        ></img>
        <input
          type="text"
          className="form-control form-control-lg mx-3"
          id="exampleFormControlInput2"
          placeholder="Type a message"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        {/* <a className="ms-1 text-muted" href="#!">
          <FontAwesomeIcon icon={faPaperclip} />
        </a>
        <a className="ms-3 text-muted" href="#!">
          <FontAwesomeIcon icon={faSmile} />
        </a>
        <a className="ms-3" href="#!">
          <FontAwesomeIcon icon={faPaperPlane} />
        </a> */}
        <button
          type="button"
          className="btn btn-light btn-lg btn-rounded "
          onClick={() => execute()}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatWindow;
