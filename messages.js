const token =
    localStorage.getItem("refreshToken");

if (!token) {
    window.location.href = "login.html";
}
const chatList = document.getElementById("chatList");
const chatName = document.getElementById("chatName");
const chatBox = document.getElementById("chatBox");
const messageForm = document.getElementById("messageForm");
const messageInput = document.getElementById("messageInput");

const matches = JSON.parse(localStorage.getItem("matches")) || [];
let selectedPet = null;

function openChat(pet) {
  selectedPet = pet;
  chatName.textContent = pet.name;

  chatBox.innerHTML = `
    <div class="message received">Hi! I am ${pet.name}. Nice to meet you.</div>
    <div class="message received">Want to plan a pet playdate?</div>
  `;
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

  if (!selectedPet) {
    alert("Please select a match first.");
    return;
  }

  const msg = document.createElement("div");
  msg.className = "message sent";
  msg.textContent = messageInput.value;

  chatBox.appendChild(msg);
  messageInput.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;
});