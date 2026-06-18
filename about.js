const isLoggedIn = localStorage.getItem("refreshToken");

const loginLink = document.getElementById("loginLink");
const aboutLink = document.getElementById("aboutLink");
const messagesLink= document.getElementById("messagesLink");
const discoverLink = document.getElementById("discoverLink");
const matchesLink = document.getElementById("matchesLink");
const profileIcon = document.getElementById("profileIcon");

if (isLoggedIn) {
    loginLink.style.display = "none";
    aboutLink.style.display = "none";
    
    messagesLink.style.display = "inline-block";
    discoverLink.style.display = "inline-block";
    matchesLink.style.display = "inline-block";
    profileIcon.style.display = "block";
    logoutBtn.style.display = "block";

    loadNavbarPetImage();

    profileIcon.addEventListener("click", () => {
    window.location.href = "my-profile.html";
    
});
}
