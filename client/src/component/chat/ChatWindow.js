import React, { useState, useEffect, useContext, useRef } from "react";
import useWebSocket from "react-use-websocket";
import { AuthContext } from "../../auth/AuthContext";
import Message from "./Message";
import { POST_FILE } from "../../utils/rest.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileArrowUp,
} from "@fortawesome/free-solid-svg-icons";

function ChatWindow(props) {
  const { session } = useContext(AuthContext);
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const [fileContent, setFileContent] = useState(null);
  const inputFile = useRef(null);
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

  const handleFileUpload = e => {
    const { files } = e.target;
    if (files && files.length) {
      const filename = files[0].name;
      console.log("filename", filename); 
      setFileContent(files[0]);
    }
  };

  const onButtonClick = () => {
    inputFile.current.click();
  };

  const sendFile = () => {
    const formData = new FormData();
    formData.append("file", fileContent);
    // formData.append("name", fileContent.name);

    POST_FILE("transfer/file", formData, session.token)
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        sendJsonMessage(`<a href=${data.data}`);
        setFileContent(null);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  }

  const sendJsonMessage = (msg) => {
    const data = {
      roomId: props.selectedRoom._id,
      msg: {
        body: msg,
        date: new Date(),
        userId: session.userId,
        username: session.username,
      },
    };
    sendMessage(JSON.stringify(data));
    setInputText("");
  }

  const execute = () => {
        // sending file
        if(fileContent !== null) {
          sendFile();
        }
    if (inputText.length < 1) return;
    // setMessages([...messages, { msg: inputText, time: "12:00 PM | Aug 13" }]);
    sendJsonMessage(inputText);
    

  };
  console.log("ChatWindow props: ", props);
  console.log("session: ", session);
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
      {fileContent !== null ?      <div className="row" >
        <p>{fileContent.name}</p>
      </div> : null}


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
 */}
         <a className="ms-3 mx-2" href="#!">
         <input
            style={{ display: "none" }}
            ref={inputFile}
            onChange={handleFileUpload}
            type="file"
          />
          <FontAwesomeIcon icon={faFileArrowUp} onClick={onButtonClick} />
        </a>
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
