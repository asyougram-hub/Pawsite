const profileComplete =
    localStorage.getItem("profileComplete");

if (!profileComplete) {
    window.location.href = "profile.html";
}