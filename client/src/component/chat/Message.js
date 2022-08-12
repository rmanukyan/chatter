import { formatDateFull } from "../../utils/dates.js";

function Message(props) {
  const baseUrl = "http://" + window.location.hostname + ":5000/static/";
  return (
    <div className="d-flex flex-row justify-content-start">
      <div>
        <img
          src={`${
            baseUrl + props.message.userId + "-ava.jpg"
          }?${new Date().getTime()}`}
          alt="avatar 1"
          style={{ width: "45px", height: "45px" }}
        ></img>

        <p className="small p-2 ms-1 mb-1 rounded-3">
          {props.message.username}
        </p>
      </div>
      <div>
        <p
          className="small p-2 ms-3 mb-1 rounded-3"
          style={{ backgroundColor: "#f5f6f7" }}
        >
          {props.message.body}
        </p>
        <p className="small ms-3 mb-3 rounded-3 text-muted float-end">
          {formatDateFull(props.message.date)}
        </p>
      </div>
    </div>
  );
}

export default Message;
