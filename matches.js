const token =
    localStorage.getItem("authToken");

if (!token) {
    window.location.href = "login.html";
}
const matchesGrid = document.getElementById("matchesGrid");



async function loadMatches() {
try {
  const response = await fetch("https://petmatch-mu.vercel.app/api/match", {
    method: "GET",
     headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
     },
    });

     let data;
     try {
        data = await response.json();
    } catch (err) {
     data = { message: "Invalid response from server" };
    }
    const matches=data.matches;
    console.log("All matches:", matches);

matches.forEach((pet, index) => {
    console.log(`Pet ${index + 1}:`, pet.name, pet.ownerId);
});
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
    <a href="#" class="messageBtn">Message</a>
  </div>
`;

    matchesGrid.appendChild(card);
    const messageBtn = card.querySelector(".messageBtn");

messageBtn.addEventListener("click", function (e) {

    e.preventDefault();

    console.log("Pet selected:", pet);
if (!pet.ownerId) {
    console.error("ownerId is null", pet);
    alert("Backend is not sending ownerId.");
    return;
}

localStorage.setItem("otherUserId", pet.ownerId._id);

localStorage.setItem("selectedPet", JSON.stringify(pet));

window.location.href = "messages.html";

});
    card.querySelector(".messageBtn").addEventListener("click", function (e) {

    e.preventDefault();

    localStorage.setItem("otherUserId", pet.ownerId._id);

    localStorage.setItem("selectedPet", JSON.stringify(pet));

    window.location.href = "messages.html";

});
  });}
   console.log("", data.matches);
   console.log("", data.matches[0]);
   
  }catch(err){
    console.log(err);
  }
  
}

loadMatches();
