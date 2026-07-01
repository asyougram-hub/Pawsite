const isLoggedIn =
    localStorage.getItem("refreshToken");

const loginLink =
    document.getElementById("loginLink");

const aboutLink =
    document.getElementById("aboutLink");

const discoverLink =
    document.getElementById("discoverLink");

const matchesLink =
    document.getElementById("matchesLink");

const messagesLink =
    document.getElementById("messagesLink");

const profileIcon =
    document.getElementById("profileIcon");

const logoutBtn =
    document.getElementById("logoutBtn");

if (isLoggedIn) {

    loginLink.style.display = "none";
    aboutLink.style.display = "none";

    discoverLink.style.display = "inline-block";
    matchesLink.style.display = "inline-block";
    messagesLink.style.display = "inline-block";

    profileIcon.style.display = "block";
    logoutBtn.style.display = "block";

    profileIcon.addEventListener("click", () => {
        window.location.href = "my-profile.html";
    });

}

async function loadNavbarPetImage() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return;

  try {
    const response = await fetch("https://petmatch-mu.vercel.app/api/pet");
    const data = await response.json();

    const myPet = data.pets.find(
      pet => pet.ownerId?._id === user._id
    );

    const img = document.getElementById("navProfileImage");

    if (img && myPet?.image) {
      img.src = myPet.image;
    }
  } catch (err) {
    console.error("Error loading navbar pet image:", err);
  }
}

document.addEventListener("DOMContentLoaded", loadNavbarPetImage);