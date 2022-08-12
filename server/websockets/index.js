const WebSocket = require("ws");
const Room = require("../models/room");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");

module.exports = async (expressServer) => {
  const clients = new Map();

  const websocketServer = new WebSocket.Server({
    verifyClient: async (info, done) => {
      logger.info(info.req.url);

      const token = info.req.url.split("/")[2];
      logger.info(`token: ${token}`);
      try {
        var decoded = jwt.verify(token, process.env.JWT_SECRET);
        info.req.user = await User.findById(decoded.id);
      } catch (err) {
        logger.error(err);
        return done(false, 403, "Not valid token");
      }
      logger.info("ws success!!");

      done(info.req);
    },
    noServer: true,
  });

  expressServer.on("upgrade", (request, socket, head) => {
    websocketServer.handleUpgrade(request, socket, head, (websocket) => {
      websocketServer.emit("connection", websocket, request);
    });
  });

  websocketServer.on(
    "connection",
    function connection(websocketConnection, connectionRequest) {
      clients.set(connectionRequest.user._id.toString(), websocketConnection);
      logger.info(`user connected: ${connectionRequest.user._id.toString()}`);

      websocketConnection.on("message", async (message) => {
        logger.info(message);

        try {
          const parsedMessage = JSON.parse(message);
          logger.info(parsedMessage);
          const room = await Room.findById(parsedMessage.roomId);
          if (room) {
            room.messages.push(parsedMessage.msg);
            room.save();

            // client is the user id here
            [...clients.keys()].forEach((client) => {
              logger.info(`user is : ${client}`);

              // send the message to all the participants in the room
              if (room.participants.includes(client)) {
                clients.get(client).send(JSON.stringify(parsedMessage));
              }
            });
          }
        } catch (err) {
          logger.error(err);
        }
      });

      websocketConnection.on("close", function (data) {
        logger.info(`data: ${data}`);
        clients.forEach((value, key) => {
          if (value === websocketConnection) {
            logger.info(`user ${key} disconnected`);
            clients.delete(key);
            logger.info(`client removed from the map`);
            return;
          }
        });
      });
    }
  );

  return websocketServer;
};
