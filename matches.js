const token =
    localStorage.getItem("refreshToken");

if (!token) {
    window.location.href = "login.html";
}
const matchesGrid = document.getElementById("matchesGrid");

const matches = JSON.parse(localStorage.getItem("matches")) || [];

if (matches.length === 0) {
  matchesGrid.innerHTML = `
    <div class="match-card">
      <div class="match-info">
        <h2>No matches yet</h2>
        <p>Go to Discover and like pets to see matches here.</p>
        <a href="discover.html">Go to Discover</a>
      </div>
    </div>
  `;
} else {
  matches.forEach(function (pet) {
    const card = document.createElement("div");
    card.className = "match-card";

    card.innerHTML = `
      <img src="${pet.image}" alt="${pet.name}">
      <div class="match-info">
        <h2>${pet.name}, ${pet.age}y</h2>
        <p>${pet.breed} • ${pet.gender}</p>
        <p>${pet.energy} • ${pet.personality}</p>
        <a href="messages.html?pet=${pet.name}">Message</a>
      </div>
    `;

    matchesGrid.appendChild(card);
  });
}