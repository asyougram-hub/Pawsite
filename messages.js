const API_URL = "https://petmatch-chat.onrender.com";
const socket = io(API_URL);

const token =localStorage.getItem("authToken");

const currentUserId = localStorage.getItem("myUserId");
const otherUserId = localStorage.getItem("otherUserId");

const selectedPet = JSON.parse(localStorage.getItem("selectedPet"));

if (!token) {
    window.location.href = "login.html";
} 

socket.emit("join", currentUserId);

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


