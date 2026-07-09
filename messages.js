const API_URL = "https://petmatch-chat.onrender.com";
const token = localStorage.getItem("authToken");

const socket = io(API_URL, {
    auth: {
        token: token
    }
});

const otherUserId = localStorage.getItem("otherUserId");

const selectedPet = JSON.parse(localStorage.getItem("selectedPet"));

if (!token) {
    window.location.href = "login.html";
} 

const chatList = document.getElementById("chatList");
const chatName = document.getElementById("chatName");
const chatBox = document.getElementById("chatBox");
const messageForm = document.getElementById("messageForm");
const messageInput = document.getElementById("messageInput");

chatName.textContent = selectedPet.name;

loadMessages();

function displayMessages(messages) {
  chatBox.innerHTML = "";

  messages.forEach(msg => {
    const div = document.createElement("div");

    div.className = msg.sender === currentUserId
      ? "message sent"
      : "message received";

    div.textContent = msg.text || msg.message;

    chatBox.appendChild(div);
  });
}

matches.forEach(function (pet) {
  const item = document.createElement("div");
  item.className = "chat-item";
  item.textContent = pet.name;

  item.addEventListener("click", function () {
    openChat(pet);
  });

  chatList.appendChild(item);
});

messageForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const message = messageInput.value.trim();

    if (!message) return;

    socket.emit("sendMessage", {
        receiver: otherUserId,
        text: message
    });

    messageInput.value = "";
});

socket.on("newMessage", (message) => {
    const div = document.createElement("div");

    div.className =
        message.sender === otherUserId
            ? "message received"
            : "message sent";

    div.textContent = message.text;

    chatBox.appendChild(div);

    chatBox.scrollTop = chatBox.scrollHeight;
});

async function loadMessages() {
    try {

        const response = await fetch(
            `${API_URL}/api/messages/${otherUserId}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        console.log("Messages:", data);

        displayMessages(data);

    } catch (err) {
        console.error(err);
    }
}


