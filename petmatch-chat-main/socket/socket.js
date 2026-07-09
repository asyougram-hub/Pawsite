import Message from "../models/message.model.js";

const users = {};

export const socketHandler = (io) => {

  io.on("connection", (socket) => {

    console.log("Socket connected:", socket.id);

    socket.on("join", (userId) => {

      users[userId] = socket.id;

      console.log("User joined:", userId);
    });

    socket.on("sendMessage", async (data) => {

      try {

        const {
          sender,
          receiver,
          text
        } = data;

        const message = await Message.create({
          sender,
          receiver,
          text
        });

        const receiverSocket = users[receiver];

        if (receiverSocket) {

          io.to(receiverSocket).emit(
            "receiveMessage",
            message
          );
        }

      } catch (error) {

        console.log("Socket Error:", error.message);
      }
    });

    socket.on("disconnect", () => {

      for (const userId in users) {

        if (users[userId] === socket.id) {

          delete users[userId];
          break;
        }
      }

      console.log("Socket disconnected:", socket.id);
    });
  });
};