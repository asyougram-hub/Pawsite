const API_URL = "https://petmatch-chat.onrender.com";
const socket = io(API_URL);

const token =localStorage.getItem("authToken");

const payload = JSON.parse(atob(token.split(".")[1]));
const currentUserId = payload.id;  

socket.emit("join", currentUserId);

if (!token) {
    window.location.href = "login.html";
}
const chatList = document.getElementById("chatList");
const chatName = document.getElementById("chatName");
const chatBox = document.getElementById("chatBox");
const messageForm = document.getElementById("messageForm");
const messageInput = document.getElementById("messageInput");

// const matches = JSON.parse(localStorage.getItem("matches")) || [];
let selectedPet = null;

async function openChat(pet) {
  selectedPet=pet;
  chatName.textContent=pet.name;
  await loadMessages(pet.currentUserId);
  
}
function displayMessages(messages) {
  chatBox.innerHTML = "";

  messages.forEach(msg => {
    const div = document.createElement("div");

    div.className = msg.sender === "me"
      ? "message sent"
      : "message received";

    div.textContent = msg.text;

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



