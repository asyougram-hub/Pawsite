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