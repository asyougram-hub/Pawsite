const token = localStorage.getItem("authToken");

if (!token) {

    alert("Please login first.");

    window.location.href = "signup.html";
}