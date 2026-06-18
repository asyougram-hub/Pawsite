//using it for loading 
window.addEventListener("load", function(){

    setTimeout(function(){

        // Hide Loader
        document.getElementById("loader").style.display = "none";

        // Show Website
        document.querySelector(".container").style.display = "block";

    }, 5000); // 25000ms = 25 seconds

});
// connected to sign up page 
setTimeout(() => {
    window.location.href = "signup.html";
}, 3000); // 3000ms = 3 seconds
let currentUser = null;
let pets = [
  {id:1, name:"Luna", type:"Cat", age:2, gender:"Female", bio:"Playful & cuddly", img:"1cat.jpg"},
  {id:2, name:"Max", type:"Dog", age:3, gender:"Male", bio:"Loves fetch and walks", img:"1dog.jpg"},
  {id:3, name:"Milo", type:"Cat", age:1, gender:"Male", bio:"Curious explorer", img:"2cat.jpg"},
  {id:4, name:"Bella", type:"Dog", age:4, gender:"Female", bio:"Gentle and friendly", img:"2dog.jpg"},
  {id:5, name:"Leo", type:"Cat", age:3, gender:"Male", bio:"King of the house", img:"3cat.jpg"},
];

function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
}

function showAuth() { showScreen('authScreen'); }
function showSignup() { showScreen('signupScreen'); }
function showSignin() { showScreen('signinScreen'); }

function signup() {
  currentUser = document.getElementById('name').value || "Pet Parent";
  showScreen('addPetScreen');
}

function signin() {
  currentUser = "Pet Parent";
  showScreen('addPetScreen');
}

function goToHome() {
  showScreen('homeScreen');
  renderCards();
}

function renderCards(filteredPets = pets) {
  const container = document.getElementById('cards');
  container.innerHTML = '';

  filteredPets.forEach(pet => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${pet.img}" alt="${pet.name}">
      <div class="info">
        <h2>${pet.name} <span>${pet.age}y</span></h2>
        <p>${pet.type} • ${pet.gender}</p>
        <p class="bio">${pet.bio}</p>
      </div>
    `;
    container.appendChild(card);
  });
}

function filterCards() {
  const type = document.getElementById('filterType').value;
  const gender = document.getElementById('filterGender').value;

  let filtered = pets;

  if (type) filtered = filtered.filter(p => p.type === type);
  if (gender) filtered = filtered.filter(p => p.gender === gender);

  renderCards(filtered);
}

function swipeLeft() {
  const cards = document.querySelectorAll('.card');
  if (cards.length > 0) {
    cards[0].style.transform = 'translateX(-500px) rotate(-30deg)';
    setTimeout(() => {
      cards[0].remove();
      if (document.querySelectorAll('.card').length === 0) {
        alert("No more pets in this filter! 🎉");
      }
    }, 400);
  }
}

function swipeRight() {
  const cards = document.querySelectorAll('.card');
  if (cards.length > 0) {
    cards[0].style.transform = 'translateX(500px) rotate(30deg)';
    setTimeout(() => {
      cards[0].remove();
      alert("It's a Match! 🥳"); // You can improve this later
    }, 400);
  }
}

// Start the app
showAuth();