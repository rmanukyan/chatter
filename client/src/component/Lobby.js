import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../auth/AuthContext";
import Room from "./chat/Room";
import ChatWindow from "./chat/ChatWindow";
import CreateRoom from "./chat/CreateRoom";
import Navbar from "./navigation/Navbar";
import { GET } from "../utils/rest.js";

function Lobby() {
  const { session } = useContext(AuthContext);
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState({ name: "" });

  // const url = "http://" + window.location.hostname + ":5000/api/v1/chats";

  const notifyRoom = (roomId) => {
    setRooms((prevState) => {
      const newState = prevState.map((r) => {
        if (r._id === roomId) {
          return { ...r, newMsg: 1 };
        }
        return r;
      });

      return newState;
    });
  };

  const joinToChat = (data) => {
    console.log("original rooms: ", rooms);
    var filteredRooms = rooms.filter((r) => r._id !== data._id);
    console.log("filteredRooms: ", filteredRooms);
    filteredRooms.push(data);

    console.log("updated: ", filteredRooms);
    setRooms(filteredRooms);
  };

  useEffect(() => {
    const bearer = "Bearer " + session.token;
    // fetch(url, {
    //   method: "GET",
    //   headers: {
    //     Authorization: bearer,
    //     "Content-Type": "application/json",
    //   },
    // })
    GET("chats", session.token)
      .then((response) => response.json())
      .then((data) => {
        console.log("getting rooms:", data.data);
        setRooms(data.data);
        setSelectedRoom(data.data[0]);
      });
  }, []);

  const addRoom = (newRoom) => {
    setRooms([...rooms, newRoom]);
    setSelectedRoom(newRoom);
  };

  const showChat = (room) => {
    const bearer = "Bearer " + session.token;
    // fetch(url + "/" + room._id, {
    //   method: "GET",
    //   headers: {
    //     Authorization: bearer,
    //     "Content-Type": "application/json",
    //   },
    // })
    GET(`chats/${room._id}`, session.token)
      .then((response) => response.json())
      .then((data) => {
        let filteredRooms = rooms.filter((r) => r._id !== data.data._id);
        filteredRooms.push(data.data);
        setRooms(filteredRooms);
        setSelectedRoom(data.data);
      });
  };

  return (
    <div className=" vh-100">
      <Navbar name={session.username} />

      <section style={{ height: "100%" }}>
        <div className="container py-5" style={{ height: "90%" }}>
          <div className="row " style={{ height: "100%" }}>
            <div className="col-md-12">
              <div
                className="card"
                id="chat3"
                style={{ borderRadius: "15px", height: "100%" }}
              >
                <div className="card-body">
                  <div className="row" style={{ height: "90%" }}>
                    <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0">
                      <div className="p-3">
                        <CreateRoom addRoom={addRoom} />

                        <div
                          data-mdb-perfect-scrollbar="true"
                          style={{ position: "relative", height: "100%" }}
                        >
                          <ul className="list-unstyled mb-0 ">
                            {rooms &&
                              rooms
                                .sort(function (a, b) {
                                  return a.name.localeCompare(b.name);
                                })
                                .map((room) => (
                                  <Room
                                    room={room}
                                    key={room.id}
                                    showChat={showChat}
                                    joinRoom={joinToChat}
                                  />
                                ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    {rooms && rooms.length > 0 ? (
                      <ChatWindow
                        notifyRoom={notifyRoom}
                        selectedRoom={selectedRoom}
                        messages={
                          selectedRoom.participants.includes(session.userId)
                            ? selectedRoom.messages
                            : []
                        }
                      />
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Lobby;
