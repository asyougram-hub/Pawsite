const token =
    localStorage.getItem("refreshToken");

if (!token) {
    window.location.href = "login.html";
}
const cardArea = document.getElementById("cardArea");
const matchText = document.getElementById("matchText");

const filterType = document.getElementById("filterType");
const filterEnergy = document.getElementById("filterEnergy");
const filterPersonality = document.getElementById("filterPersonality");
const filterLooking = document.getElementById("filterLooking");

const applyFilters = document.getElementById("applyFilters");
const resetFilters = document.getElementById("resetFilters");

const passBtn = document.getElementById("passBtn");
const likeBtn = document.getElementById("likeBtn");

let demoPets = [];
let filteredPets = [];
let currentIndex = 0;
let likedPets =
  JSON.parse(
    localStorage.getItem("likedPets")
  ) || [];

let sessionDislikedPets =
  JSON.parse(
    sessionStorage.getItem("dislikedPets")
  ) || [];

async function loadPets() {
  try {

    const response = await fetch(
      "https://petmatch-mu.vercel.app/api/pet"
    );

    const data = await response.json();

    const user = JSON.parse(
      localStorage.getItem("user")
    );

    demoPets = data.pets
  .filter((pet) =>
    pet.ownerId?._id !== user._id
  )
  .filter(
    (pet) =>
      !likedPets.includes(pet._id) &&
      !sessionDislikedPets.includes(
        pet._id
      )
  )

      .map((pet) => ({
        id: pet._id,

        name: pet.name,

        age: pet.age || 0,

        type:
          pet.category?.toLowerCase() ||
          "dog",

        breed:
          pet.breed || "Unknown Breed",

        gender:
          pet.gender || "Unknown",

        city:
          pet.ownerId?.username ||
          "PawMatch User",

        energy:
          pet.behavior?.energyLevel ||
          "Medium",

        personality:
          pet.behavior?.temperament ||
          "Friendly",

        lookingFor:
          pet.lifestyle?.adoptionReason ||
          "Friendship",

        image:
          pet.image && pet.image !== ""
            ? pet.image
            : "paw.jpg",

        bio:
          pet.lifestyle?.adoptionReason ||
          `${pet.name} is looking for new friends 🐾`
      }));


    // HOMEPAGE SEARCH FILTER
    const petType = new URLSearchParams(
      window.location.search
    ).get("pet");

    if (
      petType &&
      petType !== "both"
    ) {

      filteredPets = demoPets.filter(
        pet => pet.type === petType
      );

      filterType.value = petType;

    } else {

      filteredPets = [...demoPets];

    }

    renderCurrentPet();

  } catch (error) {

    console.error(error);

    cardArea.innerHTML = `
      <div class="empty-state">
        <h2>Unable to load pets</h2>
        <p>Please try again later.</p>
      </div>
    `;
  }
}

function renderCurrentPet() {

  if (
    filteredPets.length === 0 ||
    currentIndex >= filteredPets.length
  ) {

    cardArea.innerHTML = `
      <div class="empty-state">
        <h2>You've seen all available pets 🐾</h2>
<p>Check back later for new matches.</p>
      </div>
    `;

    matchText.textContent =
      "No matches found.";

    return;
  }

  const pet = filteredPets[currentIndex];

  cardArea.innerHTML = `
    <div class="pet-card">

      <img
        src="${pet.image}"
        alt="${pet.name}"
        onerror="this.src='paw.jpg'"
      >

      <div class="pet-info">

        <h2>
          ${pet.name},
          <span>${pet.age}y</span>
        </h2>

        <p>
          ${pet.breed}
          •
          ${pet.gender}
        </p>

        <div class="tags">
          <span>${pet.type}</span>
          <span>${pet.energy}</span>
          <span>${pet.personality}</span>
        </div>

        <p class="bio">
          ${pet.bio}
        </p>

      </div>

    </div>
  `;

  matchText.textContent =
    `${currentIndex + 1} of ${filteredPets.length} pets`;
}

function applyPetFilters() {

  currentIndex = 0;

  filteredPets = demoPets.filter((pet) => {

    const typeMatch =
      filterType.value === "any" ||
      pet.type === filterType.value;

    const energyMatch =
      filterEnergy.value === "any" ||
      pet.energy === filterEnergy.value;

    const personalityMatch =
      filterPersonality.value === "any" ||
      pet.personality ===
      filterPersonality.value;

    const lookingMatch =
      filterLooking.value === "any" ||
      pet.lookingFor ===
      filterLooking.value;

    return (
      typeMatch &&
      energyMatch &&
      personalityMatch &&
      lookingMatch
    );
  });

  renderCurrentPet();
}

function showNextPet() {

  currentIndex++;

  renderCurrentPet();
}

function swipeRight() {

  const card =
    document.querySelector(".pet-card");

  if (!card) return;

  card.style.transform =
    "translateX(400px) rotate(20deg)";

  card.style.opacity = "0";

  setTimeout(showNextPet, 300);
}

applyFilters.addEventListener(
  "click",
  applyPetFilters
);

resetFilters.addEventListener(
  "click",
  () => {

    filterType.value = "any";
    filterEnergy.value = "any";
    filterPersonality.value = "any";
    filterLooking.value = "any";

    filteredPets = [...demoPets];

    currentIndex = 0;

    renderCurrentPet();
  }
);

passBtn.addEventListener(
  "click",
  async () => {

    const pet =
      filteredPets[currentIndex];

    try {

      const token =
        localStorage.getItem("authToken");

      const response = await fetch(
        `https://petmatch-mu.vercel.app/api/pet/dislike/${pet.id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      console.log("DISLIKE STATUS:", response.status);
      console.log("DISLIKE DATA:", data);

      sessionDislikedPets.push(pet.id);

sessionStorage.setItem(
  "dislikedPets",
  JSON.stringify(
    sessionDislikedPets
  )
);

filteredPets =
  filteredPets.filter(
    (p) => p.id !== pet.id
  );

demoPets =
  demoPets.filter(
    (p) => p.id !== pet.id
  );

renderCurrentPet();

          } catch (error) {

            console.error(error);
          }
        }
      );

likeBtn.addEventListener(
  "click",
  async () => {

    const pet =
      filteredPets[currentIndex];

    try {

      const token =
        localStorage.getItem("authToken");

      const response = await fetch(
        `https://petmatch-mu.vercel.app/api/pet/like/${pet.id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      console.log("LIKE STATUS:", response.status);
      likedPets.push(pet.id);

localStorage.setItem(
  "likedPets",
  JSON.stringify(likedPets)
);

filteredPets =
  filteredPets.filter(
    (p) => p.id !== pet.id
  );

demoPets =
  demoPets.filter(
    (p) => p.id !== pet.id
  );

renderCurrentPet();
    } catch (error) {

      console.error(error);
    }
  }
);

loadPets();